import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard'; // Import the reusable card
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LatestArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/articles', {
          params: { latest: true, limit: 12 }
        });
        setArticles(response.data.data || []);
      } catch (err) {
        console.error('Error fetching latest articles:', err);
        setError('Failed to load latest articles. Please try again later.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <section id="articles" aria-labelledby="articles-heading" className="py-20 bg-gray-50 border-t border-gray-200 flex items-center justify-center min-h-screen">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 id="articles-heading" className="text-3xl font-bold text-gray-800 text-center">
          Latest Articles
        </h2>
        <p className="text-gray-600 text-center mt-2 mb-10">
          Sign in to read the full articles.
        </p>

        {loading ? (
          <div className="text-center text-gray-500">Loading latest articles...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-500">No articles available.</div>
        ) : (
          <>
            {/* Article Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  category={article.categories && article.categories.length > 0 ? article.categories[0].name : 'Uncategorized'}
                  title={article.title}
                  author={article.author && article.author.user ? article.author.user.name : 'Unknown Author'}
                  date={new Date(article.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                  imageUrl={article.featured_image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  excerpt={article.excerpt}
                />
              ))}
            </div>

            {/* "Sign In" Button */}
            <div className="text-center mt-12">
              <Link
                to="/login" // Link to the login page
                className="bg-gray-700 text-white px-10 py-3.5 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Sign in to Read More
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
