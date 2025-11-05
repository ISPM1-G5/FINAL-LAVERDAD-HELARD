import React from 'react';

export default function ArticleCard({ imageUrl, title, excerpt, category }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col">
      <img className="w-full h-40 object-cover" src={imageUrl} alt={title} />
      <div className="p-4 grow flex flex-col">
        {category && <span className="text-xs font-semibold text-blue-600 uppercase mb-1">{category}</span>}
        <h3 className="font-bold text-lg mb-2 text-gray-800 grow">{title}</h3>
        {excerpt && <p className="text-gray-600 text-sm mb-4">{excerpt}</p>}
        
        {/* Spacer to push 'Read More' to the bottom */}
        <div className="grow"></div>
        
        <a href="#" className="text-blue-600 font-semibold text-sm hover:underline mt-2">
          Read More &gt;
        </a>
      </div>
    </div>
  );
}