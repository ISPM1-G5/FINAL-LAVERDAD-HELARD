// You would typically use an icon library like react-icons
// import { HiLogout } from 'react-icons/hi';

export default function UserProfileCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">

      {/* Section 1: Profile Header */}
      <div className="flex flex-col items-center p-6">
        <img
          className="w-24 h-24 object-contain"
          src="/lvc-logo.png" // Placeholder for the school logo
          alt="Profile Logo"
        />
        <h2 className="text-2xl font-bold mt-4">Ramirez Juan Miguel</h2>
        <p className="text-sm text-gray-500">Joined November 2, 2025</p>
      </div>

      {/* Section 2: Credentials */}
      <div className="p-6 space-y-4">
        <div className="flex items-start">
          <span className="font-semibold w-24 shrink-0">Email:</span>
          <span className="text-gray-700 truncate">
            juanmiguel.ramirez@lvc.edu.ph
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-24 shrink-0">Password:</span>
          <span className="text-gray-700">**********</span>
          <button className="ml-auto text-sm text-blue-600 hover:underline font-medium">
            Change
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Last configured: 10/22/2025
        </p>
      </div>

      {/* Section 3: Logout Button */}
      <div className="p-6">
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
          {/* <HiLogout className="w-5 h-5" /> */}
          <span>Log Out</span>
        </button>
      </div>

      {/* Section 4: Delete Account */}
      <div className="p-6 bg-gray-50 rounded-b-lg">
        <h3 className="font-semibold text-red-700">Delete Account</h3>
        <p className="text-sm text-gray-600 my-2">
          Delete your account and permanently erase all associated data,
          including your profile, liked articles, and shared content. This
          action cannot be undone.
        </p>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
