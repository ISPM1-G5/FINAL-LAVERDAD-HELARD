import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import axios from 'axios';


const ArticleList = ({ title }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        let endpoint;
        if (title === 'Shared Articles') {
          endpoint = '/api/user/shared-articles';
        } else if (title === 'Liked Articles') {
          endpoint = '/api/user/liked-articles';
        } else {
          throw new Error('Invalid article type');
        }

        const response = await axios.get(endpoint, {
          params: { page: currentPage }
        });

        setArticles(response.data.data || []);
        setTotalPages(response.data.last_page || 1);
        setTotalCount(response.data.total || 0);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
        setTotalPages(1);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [currentPage, title]); // Re-fetch when page or title changes

  return (
    <section>
      <h2 className="text-2xl font-light text-gray-800 mb-4">
        {title} | <span className="text-gray-500">{totalCount}</span>
      </h2>
      
      {isLoading ? (
        <div className="text-center text-gray-500">Loading articles...</div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </section>
  );
};

export default ArticleList;