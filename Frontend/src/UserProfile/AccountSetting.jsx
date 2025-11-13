import React, { useState } from 'react';
import { Mail, Lock, Pencil, AlertTriangle } from 'lucide-react';

const AccountSettings = ({ user, onLogout, onDeleteAccount }) => {
  // State to manage the password change form
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Placeholder function for logging out
  const handleLogout = () => {
    if (onLogout) onLogout();
    // Add logout logic here
  };

  // Placeholder function for deleting account
  const handleDeleteAccount = () => {
    if (onDeleteAccount) onDeleteAccount();
    // Add delete logic here
  };

  // Placeholder function for changing password
  const handleChangePassword = (e) => {
    e.preventDefault();
    alert(`Password change submitted!`);
    // Add password change logic here
    setNewPassword('');
    setIsChangingPassword(false);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm w-full max-w-6xl mx-auto my-12">
      
      {/* Top Email Section */}
      <div className="flex items-center p-6 border-b border-gray-200">
        <Mail size={18} className="text-gray-600 mr-3" />
        <span className="text-sm font-medium text-gray-800">Email:</span>
        <span className="text-sm text-gray-600 ml-2">juan.m.ramirez@student.lverdad.edu.ph</span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
        
        {/* === LEFT COLUMN: User Info === */}
        <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src={user?.avatar || "https://via.placeholder.com/128"} // Placeholder for LVC Herald logo
            alt="Profile"
            className="w-50 h-50 rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-900">{user?.name || 'User'}</h2>
          <p className="text-sm text-gray-500 mb-2">Joined {user?.joinedDate || 'Unknown'}</p>
          <p className="text-sm text-gray-500 break-all">{user?.email || 'user@example.com'}</p>
          
          <button 
            onClick={handleLogout}
            className="w-full max-w-xs mt-8 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
          >
            Log out
          </button>
        </div>

        {/* === RIGHT COLUMN: Account Management === */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* --- Password Section --- */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Password</h3>
            {!isChangingPassword ? (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                <div>
                  <p className="text-sm text-gray-700">**********</p>
                  <p className="text-xs text-gray-500">Last configured: 10/22/2025</p>
                </div>
                <button 
                  onClick={() => setIsChangingPassword(true)}
                  className="flex items-center text-sm text-blue-600 hover:underline"
                >
                  <Pencil size={14} className="mr-1" />
                  Change Password
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleChangePassword} 
                className="p-4 border border-gray-200 rounded-md bg-gray-50"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setIsChangingPassword(false)}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* --- Delete Account Section --- */}
          <section>
            <h3 className="text-lg font-semibold text-red-700 flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              Delete Account
            </h3>
            <p className="text-sm text-gray-600 mt-2 mb-4">
              Deleting your account will permanently erase all associated data, including your profile, liked articles, and shared content. This action cannot be undone.
            </p>
            <button 
              onClick={handleDeleteAccount}
              className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
            >
              Delete Account
            </button>
          </section>

        </div>

      </div>
    </div>
  );
};

export default AccountSettings;