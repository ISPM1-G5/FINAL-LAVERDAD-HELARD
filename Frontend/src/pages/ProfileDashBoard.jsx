import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Headerlink from '../components/HeaderLink';
import Footer from '../components/Footer';
import UserProfileSidebar from '../UserProfile/UserProfile';
import ArticleList from '../UserProfile/ArticleList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfileDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

        const fetchUserData = async () => {
          try {
            const response = await axios.get('/api/user');
            const userWithJoinedDate = {
              ...response.data,
              joinedDate: new Date(response.data.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            };
            setUserData(userWithJoinedDate);
          } catch (err) {
        if (err.response && err.response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_email');
          navigate('/login');
        } else {
          setError('Failed to fetch user data.');
          console.error('Error fetching user data:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');
      navigate('/');
    }
  };

  const handleDeleteAccount = () => {
    alert('Account deletion not implemented yet.');
    // Add delete logic here
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Headerlink />

      <main className="grow bg-gray-50 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Profile */}
            <div className="lg:w-1/4">
              <UserProfileSidebar
                user={userData}
                onLogout={handleLogout}
                onDeleteAccount={handleDeleteAccount}
              />
            </div>

            {/* Right Content - Articles */}
            <div className="lg:w-3/4">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2">
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <ArticleList title="Shared Articles" />
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <ArticleList title="Liked Articles" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileDashboard;
