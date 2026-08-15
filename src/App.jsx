import { useEffect, useState } from "react";
import Header from "./components/Header";
import LocationBanner from "./components/LocationBanner";
import StateSelector from "./components/StateSelector";
import NewsGrid from "./components/NewsGrid";
import Loading from "./components/Loading";
import "./App.css";

const API_TOKEN = import.meta.env.VITE_NEWS_API_TOKEN;

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];

function App() {
  const [news, setNews] = useState([]);
  const [selectedState, setSelectedState] = useState("India");

  const [detectedState, setDetectedState] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Get today's date in YYYY-MM-DD format.
   */
  const getToday = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /*
   * Fetch news from The News API.
   *
   * India:
   *   search = India
   *
   * State:
   *   search = State name
   */
  const fetchNews = async (location = "India") => {
  try {
    setLoading(true);
    setError("");
    setNews([]);

    if (!API_TOKEN) {
      throw new Error(
        "News API token is missing. Check your .env file."
      );
    }

    const today = getToday();

    const allArticles = [];

    // Make up to 5 requests
    for (let page = 1; page <= 5; page++) {
      const params = new URLSearchParams({
        api_token: API_TOKEN,
        language: "en",
        limit: "3",
        page: page.toString(),
        published_on: today,
      });

      if (location === "India") {
        params.append("search", "India");
      } else {
        params.append("search", location);
      }

      const response = await fetch(
        `https://api.thenewsapi.com/v1/news/all?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to fetch news."
        );
      }

      const articles = data?.data || [];

      if (articles.length === 0) {
        break;
      }

      allArticles.push(...articles);

      // If fewer than 3 came back,
      // there probably aren't more results.
      if (articles.length < 3) {
        break;
      }
    }

    /*
     * Remove duplicate articles.
     * UUID is preferred, URL is the fallback.
     */
    const uniqueArticles = Array.from(
      new Map(
        allArticles.map((article) => [
          article.uuid || article.url,
          article,
        ])
      ).values()
    );

    /*
     * Keep maximum 15 articles.
     */
    setNews(uniqueArticles.slice(0, 15));

    console.log(
      `Loaded ${uniqueArticles.length} unique articles`
    );
  } catch (err) {
    console.error(err);

    setError(
      err.message ||
        "Something went wrong while loading the news."
    );
  } finally {
    setLoading(false);
  }
};

  /*
   * Reverse geocode latitude and longitude
   * using OpenStreetMap Nominatim.
   */
  const getStateFromCoordinates = async (
    latitude,
    longitude
  ) => {
    try {
      const url =
        `https://nominatim.openstreetmap.org/reverse?` +
        `lat=${latitude}&lon=${longitude}` +
        `&format=json&addressdetails=1`;

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to determine your location.");
      }

      const data = await response.json();

      const address = data?.address;

      if (!address) {
        throw new Error("State could not be detected.");
      }

      /*
       * Nominatim may return different fields depending
       * on the location.
       */
      const state =
        address.state ||
        address.region ||
        address.province;

      return state || null;
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      return null;
    }
  };

  /*
   * Ask user for browser location.
   */
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } =
          position.coords;

        const state =
          await getStateFromCoordinates(
            latitude,
            longitude
          );

        if (state) {
          /*
           * Check whether detected location is one
           * of our supported Indian states/UTs.
           */
          const matchingState = STATES.find(
            (item) =>
              item.toLowerCase() ===
              state.toLowerCase()
          );

          if (matchingState) {
            setDetectedState(matchingState);
            setSelectedState(matchingState);

            await fetchNews(matchingState);
          } else {
            /*
             * If state is not matched, keep India news.
             */
            setDetectedState(state);
            await fetchNews("India");
          }
        } else {
          setLocationStatus("failed");
        }

        setLocationStatus("success");
      },
      (error) => {
        console.log("Location permission/error:", error);

        setLocationStatus("denied");
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  /*
   * Initial load:
   *
   * 1. Show India news immediately.
   * 2. Ask for location.
   */
  useEffect(() => {
    fetchNews("India");
    requestLocation();
  }, []);

  /*
   * Change state manually.
   */
  const handleStateChange = async (state) => {
    setSelectedState(state);

    await fetchNews(state);
  };

  /*
   * Retry location detection.
   */
  const handleRetryLocation = () => {
    requestLocation();
  };

  return (
    <div className="app">
      <Header />

      <main className="main-container">
        <section className="hero-section">
          <div className="hero-label">
            TODAY'S NEWS
          </div>

          <h1>
            News from
            <span>
              {selectedState === "India"
                ? " India"
                : ` ${selectedState}`}
            </span>
          </h1>

          <p className="hero-description">
            Stay informed with today's most important
            stories from across India.
          </p>
        </section>

        <LocationBanner
          status={locationStatus}
          detectedState={detectedState}
          onRetry={handleRetryLocation}
        />

        <StateSelector
          selectedState={selectedState}
          states={STATES}
          onStateChange={handleStateChange}
          loading={loading}
        />

        <section className="news-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                LATEST
              </span>

              <h2>
                {selectedState === "India"
                  ? "Top Stories"
                  : `${selectedState} News`}
              </h2>
            </div>

            <div className="article-count">
              {news.length} stories
            </div>
          </div>

          {loading && <Loading />}

          {!loading && error && (
            <div className="error-box">
              <div className="error-icon">!</div>

              <div>
                <h3>Unable to load news</h3>

                <p>{error}</p>

                <button
                  onClick={() =>
                    fetchNews(selectedState)
                  }
                  className="retry-button"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            news.length === 0 && (
              <div className="empty-state">
                <h3>No news found</h3>

                <p>
                  We couldn't find today's news for{" "}
                  {selectedState}.
                </p>
              </div>
            )}

          {!loading && !error && news.length > 0 && (
            <NewsGrid news={news} />
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            NEWS OF THE DAY
          </div>

          <div className="footer-text">
            Today's news, simply presented.
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} News of the Day
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;