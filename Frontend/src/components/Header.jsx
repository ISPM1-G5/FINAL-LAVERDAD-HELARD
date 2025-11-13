import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking for auth token
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    console.log('Header - user_role from localStorage:', role);
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    localStorage.removeItem('is_admin');
    setIsLoggedIn(false);
    setUserRole(null);
    setShowDropdown(false);
    navigate('/');
  };

  const handleAdminAccess = () => {
    navigate('/admin');
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header
      className="flex w-full items-center px-8 py-6 bg-cover bg-right"
      style={{
        backgroundImage: `linear-gradient(to right, #2a5a82 20%, rgba(42,90,130,0.2)), url('/src/assets/images/header.png')`
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
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-yellow-500 transition-colors"
            >
              <FaUser className="text-2xl text-[#2a5a82]" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="py-1">
                  {userRole === 'admin' ? (
                    <button
                      onClick={handleAdminAccess}
                      className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                    >
                      Admin Dashboard
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-yellow-500 transition-colors">
              <FaUser className="text-2xl text-[#2a5a82]" />
            </div>
          </Link>
        )}
      </div>


    </header>
  );
}

export default Header;
