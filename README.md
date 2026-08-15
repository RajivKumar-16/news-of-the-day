# NEWS OF THE DAY 📰

NEWS OF THE DAY is a React-based news website that shows the latest news based on the user's location.

The main idea of this project is to detect the user's location, find their state, and then show news related to that state. Users can also manually select another Indian state to see its news.

## 🚀 Live Demo

Add your deployed website link here:

```text
https://news-of-the-day.vercel.app
```

## 📌 Features

* Shows news from India by default
* Asks for location permission when the website is opened
* Gets the user's latitude and longitude
* Finds the user's state using reverse geocoding
* Shows news related to the detected state
* Search for any Indian state
* Dropdown to select a state
* Shows up to 15 news articles
* Displays news image, title, description, source and publication time
* Loading animation while news is being fetched
* Error handling if the API fails
* Responsive design for mobile, tablet and desktop
* Simple black and white UI

## 🛠️ Technologies Used

* React
* Vite
* JavaScript
* JSX
* CSS
* The News API
* OpenStreetMap Nominatim API
* Browser Geolocation API

## 📂 Project Structure

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── LocationBanner.jsx
│   ├── StateSelector.jsx
│   ├── NewsCard.jsx
│   ├── NewsGrid.jsx
│   └── Loading.jsx
│
├── App.jsx
├── App.css
└── main.jsx
```

## ⚙️ How It Works

When the website is opened, it first shows news from India.

At the same time, the website asks the user for location permission.

If the user allows location access:

```text
User Location
      ↓
Latitude + Longitude
      ↓
OpenStreetMap Nominatim
      ↓
State Name
      ↓
The News API
      ↓
State News
```

For example, if the user's location is in Delhi:

```text
Location → Delhi
             ↓
        Search Delhi
             ↓
       Delhi News
```

If the user does not allow location access, the website continues to work and shows India news. The user can then manually select a state.

## 📰 News API

This project uses **The News API** to fetch news.

The application can make multiple requests to get more articles. Since the free API plan can return a limited number of articles per request, the application uses pagination and combines the results.

The application also removes duplicate articles before displaying them.

## 📍 Location API

For converting latitude and longitude into a state name, this project uses the **OpenStreetMap Nominatim API**.

Example:

```text
Latitude: 28.6139
Longitude: 77.2090
        ↓
Delhi
```

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
VITE_NEWS_API_TOKEN=YOUR_API_TOKEN
```

Replace `YOUR_API_TOKEN` with your API token from The News API.

### Important

Do not upload your `.env` file to GitHub.

Add this to `.gitignore`:

```text
.env
.env.local
node_modules
dist
```

## 💻 Installation

First clone the project:

```bash
git clone https://github.com/RajivKumar-16/news-of-the-day.git
```

Go inside the project folder:

```bash
cd news-of-the-day
```

Install the required packages:

```bash
npm install
```

Create your `.env` file and add the API token.

Then start the development server:

```bash
npm run dev
```

The website will normally open at:

```text
http://localhost:5173
```

## 🏗️ Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🎨 UI

I kept the design simple and mostly black and white.

The news images are the main colorful part of the website. The layout is inspired by modern newspaper/editorial websites.

The website is also responsive, so it can be used on:

* Desktop
* Laptop
* Tablet
* Mobile

## 📚 What I Learned

While making this project, I learned about:

* React components
* React state and `useEffect`
* Fetching data from APIs
* Working with environment variables
* Browser Geolocation API
* Reverse geocoding
* Handling API errors
* Loading states
* Responsive CSS
* Reusable components
* Pagination
* Removing duplicate data

## 🔮 Future Improvements

Some things I would like to add in the future:

* Search news by keyword
* News categories like Sports, Technology and Business
* Trending news section
* Dark mode
* Bookmark articles
* Share news
* Infinite scrolling
* Better local news filtering
* Backend API to keep the News API key secure

## 👨‍💻 Author

**Rajiv Kumar Gond**

B.Tech Information Technology Student

Built this project as part of my learning and to improve my understanding of React, APIs and frontend development.

## 📄 Note

News articles, images and their content belong to their respective publishers and sources.

This project is made for learning and educational purposes.
