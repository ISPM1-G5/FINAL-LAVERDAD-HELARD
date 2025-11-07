import React from 'react';

const TeamMemberCard = ({ name, role }) => {
  return (
    <div className="border border-gray-300 p-6 flex flex-col items-center text-center h-100 justify-center">
      {/* Placeholder for the image */}
      <div className="w-36 h-36 bg-gray-300 rounded-full mb-4"></div>
      
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

export default TeamMemberCard;