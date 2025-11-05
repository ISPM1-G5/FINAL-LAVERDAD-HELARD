import React from 'react';

export default function ContentSection({ title, bgColor, children }) {
  // A simple default color if none is provided
  const bg = bgColor || 'bg-gray-700';

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className={`flex justify-between items-center ${bg} text-white px-4 py-2 rounded-t-md`}>
        <h2 className="text-xl font-bold uppercase tracking-wide">{title}</h2>
        <a href="#" className="text-sm font-medium hover:underline">
          VIEW ALL &gt;
        </a>
      </div>

      {/* Section Body */}
      <div className="bg-white p-4 shadow-md rounded-b-md border border-t-0 border-gray-200">
        {children}
      </div>
    </section>
  );
}