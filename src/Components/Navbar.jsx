import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'

const Navbar = () => {
  const user = useSelector((store)=>store.user) 
  const dispatch = useDispatch();
  const navigate = useNavigate()
const handleLogout=async()=>{
  try {
  const res = await axios.post(BASE_URL + "/logout", {}, {withCredentials : true})
    dispatch(removeUser())
    return navigate("/login")
} catch (error) {
  console.log(error);
  
}
}

  
  return (
    <div className="navbar bg-gray-900 text-white shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl text-red-500">Dev-Tinder front</Link>
      </div>

     { user &&  <div className="  mx-4">
    <div className='flex justify-center items-center gap-2'>

          <p className='text-xl font-semibold font-stretch-200%'> {user?.firstName}</p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
              className='bg-red-50'
                alt="Tailwind CSS Navbar component"
                src={user?.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-red-500 text-white rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge shadow">New</span>
              </Link>
            </li>
            <li><Link to={"/connection"} className="justify-between">
               Connection
              </Link></li>
               <li><Link to={"/requests"} className="justify-between">
               Request
              </Link></li>
            <li><Link to={"/"} onClick={()=>handleLogout()}>Logout</Link></li>
          </ul>
        </div>
    </div>

      </div>   
      }
    </div>
  )
}

export default Navbar
