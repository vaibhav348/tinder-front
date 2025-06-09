import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((store)=>store.user)
  
  const fetchUser = async () => {
    if(userData){
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      })
      console.log(res.data);

      dispatch(addUser(res.data))
    } catch (error) {
      if (error.status === 401) {
        navigate("/login")
      }
      console.log(error);

    }
  }
  useEffect(() => {
    
     fetchUser();
 
  }, [])
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />

    </div>
  )
}

export default Body