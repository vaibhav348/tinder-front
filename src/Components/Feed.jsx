import React from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
const Feed = () => {

  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
// console.log("Only feed from Redux:", feedData[0]);


  const getFeed = async () => {
    if (feedData) {
      return
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      })

      console.log("Feed", res.data);
      dispatch(addFeed(res.data)) 

    } catch (error) {
      console.log(error.message);

    }
  }
  useEffect(() => {
    getFeed();
    
  }, []);

  return (
   <div className="p-2 min-h-screen   bg-gray-900 text-white">
      {feedData && feedData.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-2 text-center">Feed List</h2>
          <div className=" py-10 grid gap-4 
                          grid-cols-1 
                          sm:grid-cols-2 
                          md:grid-cols-3 
                          lg:grid-cols-4 
                          xl:grid-cols-5">
            {feedData.map((item, index) => (
              <UserCard user={feedData[index]} key={item._id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-400">No data found.</p>
      )}
    </div>
  )
}

export default Feed