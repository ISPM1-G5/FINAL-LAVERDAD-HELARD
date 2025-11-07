export default function ArticleCard({ article }) {
  // Dummy data if no prop is passed
  const {
    imageUrl = "/placeholder-image.png",
    category = "Literary",
    date = "October 27, 2025 | 7:50 PM",
    title = "The Ones Who Light Our Path",
    snippet = "The room was silent, except for the sound of our heavy light which our predictor...",
    author = "Heinrich Tapawan",
  } = article || {};

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Article Image */}
      <img
        className="w-full h-40 object-cover"
        src={imageUrl}
        alt={title}
      />

      {/* Article Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          {/* Category Tag */}
          <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full uppercase">
            {category}
          </span>
          {/* Date */}
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 hover:text-blue-700 cursor-pointer">
          {title}
        </h3>

        {/* Snippet */}
        <p className="text-sm text-gray-600 mt-2 flex-grow">
          "{snippet}"
        </p>

        {/* Author */}
        <p className="text-sm font-medium text-gray-800 mt-4">
          {author}
        </p>
      </div>
    </div>
  );
}
