import React, { useState } from 'react';
import { Mail, Lock, LogOut, X } from 'lucide-react';
import axios from 'axios';

export default function ProfileSidebar({ user, onLogout }) {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.password !== passwordForm.password_confirmation) {
      setPasswordError('Passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    setPasswordError('');
    setPasswordSuccess('');

    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.post('/api/change-password', passwordForm, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPasswordSuccess(response.data.message);
      setPasswordForm({
        current_password: '',
        password: '',
        password_confirmation: ''
      });
      setTimeout(() => {
        setShowChangePasswordModal(false);
        setPasswordSuccess('');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        window.location.href = '/login';
      } else {
        setPasswordError(error.response?.data?.message || 'Failed to change password');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    setIsDeleting(true);
    setDeleteError('');

    try {
      const token = localStorage.getItem('auth_token');
      await axios.post('/api/delete-account', { password: deletePassword }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDeletePassword('');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');
      onLogout();
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        window.location.href = '/login';
      } else {
        setDeleteError(error.response?.data?.message || 'Failed to delete account');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">

        {/* User Info Section */}
        <div className="flex flex-col items-center p-6 border-b border-gray-200">
          <img
            className="w-50 h-50 rounded-full border-4 border-gray-200 object-cover"
            src={user.avatarUrl}
            alt={user.name}
          />
          <h2 className="text-xl font-semibold mt-4 text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">Joined {user.joinedDate}</p>
        </div>

        {/* Account Details Section */}
        <div className="p-6 space-y-5">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-400 mt-1 " />
            <div>
              <span className="text-sm font-medium text-gray-600">Email</span>
              <p className="text-sm text-gray-900 break-all">{user.email}</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Password</span>
              </div>
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Change
              </button>
            </div>
             <p className="text-xs text-gray-500 ml-8">Last configured 10/22/2025</p>
          </div>
        </div>

        {/* Log Out Section */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 text-gray-600 hover:text-red-500 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>

        {/* Delete Account Section */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-md font-semibold text-red-700">Delete Account</h3>
          <p className="text-xs text-gray-600 mt-2">
            Deleting your account will permanently erase all associated data, including your profile, liked articles, and shared content. This action cannot be undone.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-red-700 mt-4 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-cyan-800 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                  onPaste={(e) => e.preventDefault()}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.password}
                  onChange={(e) => setPasswordForm({...passwordForm, password: e.target.value})}
                  onPaste={(e) => e.preventDefault()}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength="8"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.password_confirmation}
                  onChange={(e) => setPasswordForm({...passwordForm, password_confirmation: e.target.value})}
                  onPaste={(e) => e.preventDefault()}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
              {passwordSuccess && <p className="text-green-500 text-sm mb-4">{passwordSuccess}</p>}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                  disabled={isChangingPassword}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-cyan-800 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-700">Delete Account</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone. Enter your password to confirm deletion.
            </p>
            <form onSubmit={handleDeleteAccount}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  onPaste={(e) => e.preventDefault()}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  requireds
                />
              </div>
              {deleteError && <p className="text-red-500 text-sm mb-4">{deleteError}</p>}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                  disabled={isDeleting}
                >
                </button>
                <button
                  type="submit"
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
