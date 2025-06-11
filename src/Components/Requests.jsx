import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'
import RequestCard from './RequestCard'

const Requests = () => {
const disapatch  = useDispatch()
    const featchRequests= async()=>{
        const res= await axios.get(BASE_URL+"/user/requests/recieved", {withCredentials:true})
        disapatch(addRequests(res.data.connectionRequest))
        
    }

    useEffect(()=>{
        featchRequests()
    },[])
    
    const requests = useSelector((store)=>store.requests)
    console.log("hf",requests);
  return (
    requests?.length > 0 ?  <div className='text-white p-4'>
        <p className='flex font-semibold text-xl justify-center '>Requests</p>
<div className=' py-10 grid gap-4 
                          grid-cols-1 
                          sm:grid-cols-2 
                          md:grid-cols-3 
                          lg:grid-cols-4 
                          xl:grid-cols-5'>

   {requests.map((item, index) => (
       <RequestCard user={requests[index]} key={item._id} item={item} />
    ))}
    </div>

    </div>
    :
    <div className="p-2 min-h-[90vh]    bg-gray-900 text-white">
    <div className=' flex justify-center h-[50vh] items-center '>

               <p className=' text-center  font-semibold text-2xl font-mono text-gray-400 '>No Requests Found!!!</p>
        </div>
    </div>
  )
}

export default Requests