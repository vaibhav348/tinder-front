import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import UserCard from './UserCard'
import ConnectionCard from './ConnectionCard'

const Connection = () => {

    const dispatch = useDispatch()

    const fetchConnection = async()=>{
        try {
            const res= await axios.get(BASE_URL + "/user/connections", {withCredentials:true})
               dispatch(addConnections(res.data.data))
                        
        } catch (error) {
            console.log(error.log)
        }
    }

useEffect(() => {
  fetchConnection()

}, [])


  const connections = useSelector((store)=>store.connection)
console.log("cccccccccc",connections);

  return (
   connections?.length > 0 ?  <div className='text-white p-4  min-h-[90vh]    bg-gray-900 '>
        <p className='flex font-semibold text-xl justify-center '>Connections</p>
<div className=' py-10 grid gap-4 
                          grid-cols-1 
                          sm:grid-cols-2 
                          md:grid-cols-3 
                          lg:grid-cols-4 
                          xl:grid-cols-5'>

   {connections.map((item, index) => (
       <ConnectionCard user={connections[index]} key={item._id} item={item} />
    ))}
    </div>

    </div>
    :
      <div className="p-2 min-h-[90vh]    bg-gray-900 text-white">
    <div className=' flex justify-center h-[50vh] items-center '>

               <p className=' text-center  font-semibold text-2xl font-mono text-gray-400 '>No Connections Found!!!</p>
        </div>
    </div>
    
  )
}

export default Connection