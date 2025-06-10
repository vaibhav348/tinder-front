import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="relative my-4 px-4 min-w-fit w-auto bg-[#111827] bg-opacity-80 rounded-2xl shadow-lg border border-gray-700 hover:shadow-purple-600/60 transition-all duration-300 backdrop-blur-md">
      
      {/* Glowing border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-25"></div>

      {/* Actual content */}
      <div className="relative z-10 p-5 text-white space-y-3">
        
        {/* Profile image */}
        <div className="flex justify-center">
          <img
            src={user.photoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-md"
          />
        </div>

        {/* Basic info */}
        <div className="text-center mt-2">
          <h2 className="text-lg font-semibold font-mono text-blue-400">{`${user?.firstName} ${user?.lastName}`}</h2>
          <p className="text-sm text-gray-400">{user?.age} | {user?.gender}</p>
          <p className="text-sm text-gray-300 italic">{user?.about}</p>
        </div>

        {/* Skills section */}
        {user?.skills?.length > 0 && (
          <div className="mt-3">
            <p className="font-semibold text-sm text-pink-400 mb-1">Skills</p>
            <ul className="list-disc list-inside text-xs text-gray-300 pl-2">
              {user.skills.map((skill, index) => (
                <li key={index} className="hover:text-purple-400 transition">{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Futuristic action buttons */}
        <div className="flex justify-between gap-3 mt-4">
          <button className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-xl text-sm font-semibold transition shadow-md shadow-red-500/30">
            IGNORE
          </button>
          <button className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-xl text-sm font-semibold transition shadow-md shadow-green-500/30">
            INTERESTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
