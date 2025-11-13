import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderLink from '../components/HeaderLink';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalUsers: 0,
    totalViews: 0,
    recentArticles: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/admin/check-access', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.data.is_admin) {
          navigate('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Admin access check failed:', error);
        navigate('/dashboard');
      }
    };

    checkAdminAccess();
    fetchDashboardStats();
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
        <HeaderLink/>


      <main className="flex-1 container mx-auto px-4 py-8 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white bg-cyan-600 px-4 py-2 rounded">Admin Dashboard</h1>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📝</div>
              <div>
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👥</div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👁️</div>
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ArticleManagement />
            <UserManagement />
            <RecentActivity />
            <NotificationsPanel />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UserStats stats={stats} />
              <TopArticles stats={stats} />
            </div>

            <AnalyticsOverview />

            {/* Recent Articles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Articles</h3>
              <div className="space-y-4">
                {stats.recentArticles.slice(0, 5).map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium">{article.title}</h4>
                      <p className="text-sm text-gray-600">
                        By {article.author?.user?.name || 'Unknown'} • {new Date(article.published_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {article.categories?.[0]?.name || 'Uncategorized'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// User Stats Component
const UserStats = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">User Stats</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Active Users</span>
          <span className="font-medium">{stats.totalUsers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">New This Month</span>
          <span className="font-medium">12</span>
        </div>
      </div>
    </div>
  );
};

// Top Articles Component
const TopArticles = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Top Articles</h3>
      <div className="space-y-2">
        {stats.recentArticles.slice(0, 3).map((article, index) => (
          <div key={article.id} className="flex justify-between items-center">
            <span className="text-sm truncate flex-1">{article.title}</span>
            <span className="text-xs text-gray-500 ml-2">#{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Article Management Component
const ArticleManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Article Management</h3>
      <div className="space-y-2">
        <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
          Create New Article
        </button>
        <button className="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700">
          Manage Drafts
        </button>
      </div>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">User Management</h3>
      <div className="space-y-2">
        <button className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700">
          Add New User
        </button>
        <button className="w-full bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700">
          Manage Roles
        </button>
      </div>
    </div>
  );
};

// Recent Activity Component
const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p>• New article published</p>
        <p>• User registered</p>
        <p>• Comment added</p>
        <p>• Article edited</p>
      </div>
    </div>
  );
};

// Analytics Overview Component
const AnalyticsOverview = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Analytics Overview</h3>
      <div className="text-center text-gray-500 py-4">
        <p className="text-sm">Analytics dashboard</p>
        <p className="text-xs">Performance metrics</p>
      </div>
    </div>
  );
};

// Notifications Panel Component
const NotificationsPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span>System alerts</span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">3</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Pending reviews</span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">5</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
