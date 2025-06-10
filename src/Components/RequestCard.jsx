import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

const RequestCard = ({ user }) => {
  // console.log(user);
  const dispatch = useDispatch()
  const handleAccepted = async (e) => {
    e.preventDefault(); // Stop page refresh

    try {
      const res = await axios.post(
        BASE_URL + "/request/review/accepted/" + (user?._id),
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequest(user?._id))

    } catch (error) {
      console.log(error.message);

    }
  }

  const handleRejected = async (e) => {
    e.preventDefault(); // Stop page refresh
   

    try {
      const res = await axios.post(
        BASE_URL + "/request/review/rejected/" + (user?._id),
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequest(user?._id))


    } catch (error) {
      console.log(error.message);

    }
  }
  return (
    <div className="relative my-4 px-4 min-w-fit w-auto bg-[#111827] bg-opacity-70 rounded-2xl shadow-md border border-gray-700 hover:shadow-blue-500/50 transition-all duration-300 backdrop-blur-md">

      {/* Glowing border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25"></div>

      {/* Content */}
      <div className="relative z-10 p-4 text-white space-y-2">
        {/* Profile image */}
        <div className="flex justify-center">
          <img
            src={user?.fromUserId
              ?.photoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-purple-600 shadow-lg"
          />
        </div>

        {/* Name and Bio */}
        <div className="text-center mt-2">
          <h2 className="text-lg font-semibold tracking-wide font-mono text-blue-400">{`${user?.fromUserId
            ?.firstName} ${user?.fromUserId
              ?.lastName}`}</h2>
          <p className="text-sm text-gray-400">{user?.fromUserId?.age} | {user?.fromUserId?.gender}</p>
          <p className="text-sm text-gray-300 italic">{user?.fromUserId?.about}</p>
        </div>

        {/* Skills Section */}
        {/* {user?.fromUserId?.skills?.length > 0 && (
  <div className="mt-2">
    <p className="font-semibold text-sm text-pink-400">Skills</p>
    <ul
      className={`text-xs text-gray-200 pl-2 gap-x-4 gap-y-1 ${
        user?.fromUserId?.skills.length <= 5
          ? 'grid grid-cols-2'
          : 'list-disc list-inside space-y-1'
      }`}
    >
      {user?.fromUserId?.skills.map((skill, index) => (
        <li key={index} className="hover:text-purple-400 transition">
          {skill}
        </li>
      ))}
    </ul>
  </div>
)} */}

        {/* Futuristic action buttons */}
        <div className="flex justify-between gap-3 mt-8">
          <button onClick={handleRejected} className="w-1/2 bg-red-700 hover:bg-red-500 text-white py-1.5 rounded-xl text-sm font-semibold transition shadow-md shadow-red-500/30">
            REJECTRED
          </button>
          <button onClick={handleAccepted} className="w-1/2 bg-green-700 hover:bg-green-500 text-white py-1.5 rounded-xl text-sm font-semibold transition shadow-md shadow-green-500/30">
            ACCEPTED
          </button>
        </div>

      </div>
    </div>
  );
};

export default RequestCard;
