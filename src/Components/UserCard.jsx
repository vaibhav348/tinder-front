import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeedUser } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const interested = async () => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/interested/" + user._id, {}, {
        withCredentials: true
      })
      console.log(res);
      dispatch(removeFeedUser(user?._id))

    } catch (error) {
      console.log(error.message);

    }
  }

  const ignore = async () => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/ignore/" + user._id, {}, {
        withCredentials: true
      })
      console.log(res);
      dispatch(removeFeedUser(user?._id))

    } catch (error) {
      console.log(error.message);

    }
  }

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
      <div
  className={`flex justify-center ${
    (user?.firstName?.length + user?.lastName?.length) > 20
      ? 'flex-col gap-0 '
      : 'flex-row gap-2'
  }`}
>
  <p className="text-base font-semibold font-mono text-zinc-100">{user?.firstName}</p>
  <p className="text-base font-semibold font-mono text-zinc-100">{user?.lastName}</p>
</div>



          <p className="text-sm my-2 text-gray-400">{user?.age} | {user?.gender}</p>
          <div className='flex justify-center'>

            <p className="text-sm  text-gray-300 italic break-words leading-relaxed text-justify max-w-[27ch]">{user?.about}</p>

          </div>
        </div>

        {/* Skills section */}
        {user?.skills?.length > 0 && (
          <div className="mt-3">
            <p className="font-semibold text-sm text-purple-300 uppercase text-shadow-black mb-1 pl-2">Skills</p>
           <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-2 text-xs text-gray-300 max-w-full">
  {user.skills.map((skill, index) => (
    <div
      key={index}
      className="text-sm px-2 py-1 bg-gray-200 text-purple-950 rounded hover:text-purple-800 transition cursor-default text-center"
    >
      {skill}
    </div>
  ))}
</div>

          </div>
        )}

        {/* Futuristic action buttons */}
        <div className="flex justify-between gap-3 mt-4  ">
          <button onClick={ignore} className="min-w-fit w-25 bg-red-700 hover:bg-red-500 text-white p-2 rounded-xl text-sm font-semibold transition shadow-md shadow-red-500/30">
            IGNORE
          </button>
          <button onClick={interested} className="min-w-fit w-25 bg-green-700 hover:bg-green-500 text-white p-2 rounded-xl text-sm font-semibold transition shadow-md shadow-green-500/30">
            INTERESTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
