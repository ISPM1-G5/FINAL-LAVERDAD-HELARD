import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderLink from '../components/HeaderLink';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../UserProfile/Pagination';
import logo from '../assets/images/logo.svg';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/articles', {
          params: { category: 'news', page: currentPage }
        });
        setArticles(response.data.data || []);
        setTotalPages(response.data.last_page || 1);
      } catch (err) {
        console.error('Error fetching news articles:', err);
        setError('Failed to load news articles. Please try again later.');
        setArticles([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticles();
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeaderLink />

      <main className="container mx-auto grow">
        <div className="bg-news-bg bg-cover bg-center h-20" style={{
          backgroundImage: `linear-gradient(to right, #2a5a82 20%, rgba(42,90,130,0.2)), url('/src/assets/images/bg.jpg' )`
        }}>
          <h1 className="text-5xl font-bold text-white justify-center flex items-center h-full md-8">NEWS</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <div className="bg-gray-200 h-48 rounded-lg"></div>
                <div className="mt-4 space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-full"></div>
                  <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : articles.length === 0 ? (
          <section className="text-center text-gray-500 justify-center py-5 mt-20">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="La Verdad Herald Logo" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Nothing Published Yet</h1>
           Stay tuned, new stories will be up soon.
          </section>

        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.map(article => (
                <ArticleCard
                  key={article.id}
                  imageUrl={article.featured_image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.categories && article.categories.length > 0 ? article.categories[0].name : 'News'}
                  author={article.author && article.author.user ? article.author.user.name : 'Unknown Author'}
                  date={new Date(article.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
