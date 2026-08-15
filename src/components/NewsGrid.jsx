import NewsCard from "./NewsCard";

function NewsGrid({ news }) {
  return (
    <div className="news-grid">
      {news.map((article, index) => (
        <NewsCard
          key={
            article.uuid ||
            `${article.title}-${index}`
          }
          article={article}
          featured={index === 0}
        />
      ))}
    </div>
  );
}

export default NewsGrid;