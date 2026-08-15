function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-line"></div>

      <div className="loading-grid">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              className="skeleton-card"
              key={index}
            >
              <div className="skeleton-image"></div>

              <div className="skeleton-content">
                <div className="skeleton-small"></div>

                <div className="skeleton-title"></div>

                <div className="skeleton-title short"></div>

                <div className="skeleton-text"></div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Loading;