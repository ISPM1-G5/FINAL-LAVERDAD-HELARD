export default function ArticleCard({ article, onClick }) {
  // Dummy article data
  const dummyArticle = {
    imageUrl: "image_520665.png",
    category: "LITERARY",
    date: "October 15, 2025 at 8:40 AM",
    title: "The Operator",
    snippet: "Inside the hum of progress, someone turns the unseen gears. A quiet hand aligns the pipes of wisdom, feeds the lessons through...",
    author: "Maria Geraldine Closa",
  };

  // Use provided article or dummy
  const {
    imageUrl,
    category,
    date,
    title,
    snippet,
    author,
  } = article || dummyArticle;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer" onClick={onClick}>
      {/* Article Image */}
      <img
        className="w-full h-40 object-cover"
        src={imageUrl}
        alt={title}
      />

      {/* Article Content */}
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-center mb-2">
          {/* Category Tag */}
          <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded-full uppercase">
            {category}
          </span>
          {/* Date */}
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 hover:text-blue-700">
          {title}
        </h3>

        {/* Snippet */}
        <p className="text-sm text-gray-600 mt-2 grow">
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
