import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './HeaderLink';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking for auth token
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header
      className="flex w-full items-center px-8 py-4 bg-cover bg-right"
      style={{
        backgroundImage: `linear-gradient(to right, #2a5a82 60%, rgba(42,90,130,0.7)), url('/src/assets/images/header.png')`
      }}
    >

      {/* Invisible spacer to push content to center */}
      <div className="flex-1"></div>

      {/* === CENTERED CONTENT === */}
      <div className="flex flex-col items-center gap-2">
        {/* Images */}
        <div className="flex items-center gap-6">
          <img
            src="/src/assets/images/logo.svg"
            alt="La Verdad Logo"
            className="h-[70px] w-auto"
          />

          <img
            src="/src/assets/images/la verdad herald.svg"
            alt="La Verdad Herald"
            className="h-[50px] w-auto"
          />
        </div>
      </div>

      {/* Invisible spacer to balance the layout */}
      <div className="flex-1"></div>

      {/* === RIGHT SIDE === */}
      <div className="flex items-center relative">
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
            >
              <FaUser className="text-2xl text-[#2a5a82]" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="py-1">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors">
              <FaUser className="text-2xl text-[#2a5a82]" />
            </div>
          </Link>
        )}
      </div>


    </header>
  );
}

export default Header;
