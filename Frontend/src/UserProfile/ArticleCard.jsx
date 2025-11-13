import React from 'react';

const ArticleCard = ({ featured_image, categories, published_at, title, excerpt, author }) => {
  const imageUrl = featured_image || 'https://via.placeholder.com/300x200';
  const category = categories && categories.length > 0 ? categories[0].name : 'Uncategorized';
  const timestamp = published_at ? new Date(published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';
  const snippet = excerpt || '';
  const authorName = author && author.user ? author.user.name : 'Unknown Author';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col max-w-full">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-32 object-cover"
      />

      <div className="p-3 flex flex-col grow">
        <div className="flex flex-col items-start mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase">
            {category}
          </span>
          <span className="text-xs text-gray-500">
            {timestamp}
          </span>
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 text-left">
          {title}
        </h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2 grow text-left">
          {snippet}
        </p>
        <p className="text-xs text-gray-500 italic text-left">
          {authorName}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;