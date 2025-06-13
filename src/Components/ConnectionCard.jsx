import React from 'react';

const ConnectionCard = ({ user }) => {
  return (
    <div className="relative my-4 px-4 min-w-fit w-auto bg-[#111827] bg-opacity-70 rounded-2xl shadow-md border border-gray-700 hover:shadow-blue-500/50 transition-all duration-300 backdrop-blur-md">
      
      {/* Glowing border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25"></div>

      {/* Content */}
      <div className="relative z-10 p-4 text-white space-y-2">
        {/* Profile image */}
        <div className="flex justify-center">
          <img
            src={user.photoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-600 shadow-lg"
          />
        </div>

        {/* Name and Bio */}
        <div className="text-center mt-2">
          <h2 className="text-lg font-semibold tracking-wide font-mono text-blue-400">{`${user?.firstName} ${user?.lastName}`}</h2>
          <p className="text-sm text-gray-400">{user?.age} | {user?.gender}</p>
          <p className="text-sm text-gray-300 italic">{user?.about}</p>
        </div>

        {/* Skills Section */}
       {user?.skills?.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold text-sm text-pink-400">Skills</p>
    <div className="flex flex-wrap gap-2 mt-1 max-w-full max-h-48 overflow-y-auto">
      {user.skills.map((skill, index) => (
        <p
          key={index}
          className="text-sm bg-gray-200 text-purple-900 rounded px-2 py-1 flex-grow basis-[calc(25%-0.5rem)] text-center hover:text-purple-800 transition"
        >
          {skill}
        </p>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ConnectionCard;
