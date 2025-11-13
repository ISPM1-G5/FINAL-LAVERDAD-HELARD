import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LatestSection() {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get('/api/latest-articles');
        setLatestArticles(response.data);
      } catch (err) {
        console.error('Error fetching latest articles:', err);
        setError('Failed to load latest articles');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
          Latest
        </h2>
        <div className="text-center text-gray-500">Loading latest articles...</div>
      </section>
    );
  }

  if (error || latestArticles.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
          Latest
        </h2>
        <div className="text-center text-gray-500">
          {error || 'No latest articles available'}
        </div>
      </section>
    );
  }

  const mainArticle = latestArticles[0];
  const sideArticles = latestArticles.slice(1, 3);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
        Latest
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Article (Left) */}
        {mainArticle && (
          <div className="lg:col-span-2 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <img
              src={mainArticle.featured_image || "https://via.placeholder.com/600x400?text=No+Image"}
              alt={mainArticle.title}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
              <h3 className="font-bold text-2xl text-gray-800 mb-2">
                {mainArticle.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {mainArticle.excerpt}
              </p>
              <a href={`/article/${mainArticle.slug}`} className="text-blue-600 font-semibold hover:underline">
                Read More {'>'}
              </a>
            </div>
          </div>
        )}

        {/* Side Articles (Right) */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {sideArticles.map((article, index) => (
            <div key={article.id || index} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              <img
                src={article.featured_image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg text-gray-800 mb-1">{article.title}</h4>
                <a href={`/article/${article.slug}`} className="text-blue-600 font-semibold text-sm hover:underline">
                  Read More {'>'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
