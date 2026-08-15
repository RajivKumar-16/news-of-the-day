function LocationBanner({
  status,
  detectedState,
  onRetry,
}) {
  if (status === "success" && detectedState) {
    return (
      <div className="location-banner location-success">
        <div className="location-left">
          <div className="location-icon">
            ◉
          </div>

          <div>
            <strong>
              Location detected
            </strong>

            <span>
              Showing news from {detectedState}
            </span>
          </div>
        </div>

        <span className="location-status">
          ● LIVE
        </span>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="location-banner">
        <div className="location-left">
          <div className="location-icon pulse">
            ◉
          </div>

          <div>
            <strong>
              Detecting your location...
            </strong>

            <span>
              Finding your state to personalize
              today's news.
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (
    status === "denied" ||
    status === "failed"
  ) {
    return (
      <div className="location-banner location-warning">
        <div className="location-left">
          <div className="location-icon">
            !
          </div>

          <div>
            <strong>
              Location access unavailable
            </strong>

            <span>
              Showing India news. You can select
              your state below.
            </span>
          </div>
        </div>

        <button
          className="location-retry"
          onClick={onRetry}
        >
          Allow Location
        </button>
      </div>
    );
  }

  if (status === "unsupported") {
    return (
      <div className="location-banner location-warning">
        <div className="location-left">
          <div className="location-icon">
            !
          </div>

          <div>
            <strong>
              Location isn't supported
            </strong>

            <span>
              Please select your state manually.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default LocationBanner;