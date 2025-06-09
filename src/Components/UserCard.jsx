import React from 'react';

const UserCard = ({user}) => {
  {
    console.log("usercard user", user);
    
  }
  return (
    <div className="card  px-4 min-w-fit bg-base-100 w-auto shadow-sm  rounded-lg">
      
      {/* Smaller image */}
      <figure className="mt-3 w-40 h-40 mx-auto">
        <img
          src={user.photoUrl}
          alt="Profile"
        />
      </figure>
       

      {/* Tighter body */}
      <div className=" p-3 text-gray-800">
        <h2 className="card-title text-base font-semibold font-mono">{`${user?.firstName} ${user?.lastName}`}</h2>
        <p className="text-sm">{user?.age} {user?.gender}</p>

        <p className="text-sm">{ user?.about}</p>

        {
            user?.skills?.length > 0 ? <div className="mt-2">
          <p className="font-semibold text-sm mb-1">Skills</p>
          <ul className="list-disc list-inside text-xs space-y-0.5">
        
               
         {user?.skills?.map((skill, index) => (

  <p key={index}>{` ${index + 1}: ${skill}`}</p>
)
)}

          </ul>

          {/* <ul className="list-disc list-inside text-xs space-y-0.5">
            <li>DSA</li>
            <li>HTML</li>
            <li>REACT JS</li>
            <li>NODE JS</li>
          </ul> */}
        </div>
        : ""
        }

        {/* Compact buttons */}
        <div className="bg-gray-200 rounded-lg flex justify-between gap-2 mt-3 p-2">
          <button className="bg-red-300 text-black py-1 px-3 rounded-lg border border-zinc-600 w-1/2 hover:bg-red-400 transition text-sm">
            IGNORE
          </button>
          <button className="bg-green-300 text-black py-1 px-3 rounded-lg border border-zinc-600 w-1/2 hover:bg-green-400 transition text-sm">
            INTERESTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
