import React from 'react';

export default function Pagination({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };



  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="py-2 px-4 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`py-2 px-4 rounded-lg text-sm font-medium ${
            currentPage === page
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="py-2 px-4 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
