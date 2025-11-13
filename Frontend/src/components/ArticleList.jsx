import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleList = ({ title, articles }) => {
  // If no articles are provided, show a message
  if (!articles || articles.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-500">No articles to display.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            category={article.category}
            title={article.title}
            author={article.author}
            date={article.date}
            imageUrl={article.imageUrl}
            excerpt={article.excerpt}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
