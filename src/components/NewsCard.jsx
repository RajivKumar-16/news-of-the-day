function NewsCard({ article, featured = false }) {
  const {
    title,
    description,
    image_url,
    published_at,
    url,
    source,
  } = article;

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const sourceName =
    typeof source === "string"
      ? source
      : source?.name || "News Source";

  return (
    <article
      className={`news-card ${
        featured ? "featured-card" : ""
      }`}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-image-wrapper"
      >
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="news-image"
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            NEWS
          </div>
        )}
      </a>

      <div className="news-content">
        <div className="news-meta">
          <span>{sourceName}</span>

          <span className="meta-dot">
            •
          </span>

          <time>
            {formatDate(published_at)}
          </time>
        </div>

        <h3 className="news-title">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h3>

        {description && (
          <p className="news-description">
            {description}
          </p>
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more"
        >
          Read story
          <span>→</span>
        </a>
      </div>
    </article>
  );
}

export default NewsCard;