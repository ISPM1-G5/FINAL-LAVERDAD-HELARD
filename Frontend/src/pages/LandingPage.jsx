import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assumes you are using React Router for navigation

// Import components
import RegisterModal from '../components/RegisterModal'; // The modal component

// Import static assets
// Make sure to adjust these paths to where you store your assets
import bgImage from '../assets/images/bg.jpg';
import logo from '../assets/images/logo.svg';
import laVerdadHeraldLogo from '../assets/images/la-verdad-herald.svg'; // Note: filenames with spaces are tricky, I renamed it

/**
 * Helper function to format date strings
 * Input: "2025-10-30T10:00:00Z"
 * Output: "Oct 30, 2025"
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// The main landing page component
function LandingPage({ latestArticles = [] }) {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  // Define the hero background style object
  const heroStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(18, 94, 124, 0.5), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>
      <section
        className="flex min-h-screen flex-col items-center justify-center text-white"
        style={heroStyle}
      >
        <div className="container mx-auto max-w-7xl px-4 py-10 text-center">
          <div className="mb-6 flex flex-col items-center space-y-4 py-4">
            <img
              src={logo}
              alt="La Verdad Christian College Logo"
              className="h-auto w-48"
            />
            <img
              src={laVerdadHeraldLogo}
              alt="La Verdad Herald"
              className="h-auto w-96"
            />
            <p className="text-xl font-medium text-gray-300">
              The Official Higher Education Student Publication of La Verdad
              Christian College, Inc.
            </p>
          </div>
          <div className="flex justify-center space-x-2 scroll-px-20">
            <Link
              to="/login"
              className="px-10 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded shadow transition duration-150"
            >
              Log In
            </Link>
            <button
              onClick={toggleModal}
              className="px-10 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded shadow transition duration-150"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Register Modal - It will only show when isRegisterModalOpen is true */}
      <RegisterModal isOpen={isRegisterModalOpen} onClose={toggleModal} />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-light text-gray-700 mb-6">
            Welcome to La Verdad Herald
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            La Verdad Herald is the official digital publication platform of La
            Verdad Christian College, Inc., committed to upholding the highest
            standards of student journalism. Our mission is to deliver
            <strong>
              {' '}
              timely, accurate, and engaging news coverage
            </strong>{' '}
            of campus events, student achievements, community updates, and
            socially relevant issues.
          </p>
          <p className="text-gray-600 leading-relaxed">
            As a student-run publication, we provide a voice for the LVCC
            community, fostering dialogue,
            <strong> celebrating excellence</strong>, and providing a means to
            stay informed with the latest news from your campus community.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-gray-700 mb-4">
            Latest Articles
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign in to read the full articles.
          </p>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {latestArticles.length > 0 ? (
              latestArticles.map((article) => (
                <div
                  key={article.id} // React needs a unique key for list items
                  className="transform rounded-lg bg-white p-4 text-left shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded bg-gray-200">
                    {/* You can place an article image here */}
                    {/* <img src={article.image_url} alt={article.title} className="h-full w-full object-cover" /> */}
                    <span className="text-sm text-gray-500">Image</span>
                  </div>
                  <h3 className="mb-1 text-sm font-semibold leading-snug text-gray-800">
                    {article.title}
                  </h3>
                  <p className="mb-2 text-xs text-gray-500 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="text-xs text-blue-600 font-medium">
                    {formatDate(article.published_at)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 md:col-span-3">No articles found.</p>
            )}
          </div>

          <div className="mt-12">
            <Link
              to="/login"
              className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-lg transition duration-150"
            >
              Sign In to Read More
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} La Verdad Herald. All rights reserved.
      </footer>
    </>
  );
}

export default LandingPage;
