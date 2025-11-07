import React from 'react';

const AccountSettings = ({ user, onLogout, onDeleteAccount }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      {user && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {user.joinedDate}</p>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <button
          onClick={onLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
        <button
          onClick={onDeleteAccount}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
