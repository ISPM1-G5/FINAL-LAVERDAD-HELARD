import React from 'react';
import PropTypes from 'prop-types';

export default function ContentSection({ title, bgColor, children, viewAllUrl, viewAllText = 'VIEW ALL >' }) {
  // A simple default color if none is provided
  const bg = bgColor || 'bg-gray-700';

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className={`flex justify-between items-center ${bg} text-white px-4 py-2 rounded-t-md`}>
        <h2 className="text-xl font-bold uppercase tracking-wide">{title}</h2>
        {viewAllUrl && (
          <a href={viewAllUrl} className="text-sm font-medium hover:underline">
            {viewAllText}
          </a>
        )}
      </div>

      {/* Section Body */}
      <div className="bg-white p-4 shadow-md rounded-b-md border border-t-0 border-gray-200">
        {children}
      </div>
    </section>
  );
}

ContentSection.propTypes = {
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  viewAllUrl: PropTypes.string,
  viewAllText: PropTypes.string,
};