import React from 'react';

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const options = {
    year: 'numeric',
    month: 'long', // 'long' for "September"
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return new Date(dateString).toLocaleString('en-US', options);
};

const categoryStyles = {
  NEWS: 'text-blue-600',
  LIFESTYLE: 'text-purple-600',
  'SOCIAL WORK': 'text-green-600',
  DEFAULT: 'text-gray-600',
};

function ArticleCard({ category, title, author, date, imageUrl, excerpt = '' }) {
  const categoryClass =
    categoryStyles[category.toUpperCase()] || categoryStyles.DEFAULT;

  return (
    <div className="transform rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg overflow-hidden">
      {/* 1. Article Image */}
      <div className="w-full h-50 overflow-hidden">
        <img
          src={imageUrl || 'https://via.placeholder.com/400x200'} // Use placeholder if no image
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* 2. Content Area */}
      <div className="p-4 text-left">
        {/* 3. Metadata (Category & Date) */}
        <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
          <span className={`font-semibold uppercase ${categoryClass}`}>
            {category}
          </span>
          <span>{formatDateTime(date)}</span>
        </div>

        {/* 4. Title */}
        <h3 className="mb-2 text-md font-bold leading-snug text-gray-800">
          {title}
        </h3>

        {/* 5. Excerpt */}
        <p className="mb-3 text-sm text-gray-600 line-clamp-3">
          {excerpt}
        </p>

        {/* 6. Author */}
        <p className="text-xs text-gray-500 italic">
          {author}
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;