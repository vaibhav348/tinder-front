import React from 'react'
import { useSelector } from 'react-redux' 

const Navbar = () => {
  const user = useSelector((store)=>store.user) 
  
  return (
    <div className="navbar bg-gray-900 text-white shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-red-500">Dev-Tinder front</a>
      </div>

     { user &&  <div className="  mx-4">
    <div className='flex justify-center items-center gap-2'>

          <p className='text-xl font-semibold font-stretch-200%'> {user?.user?.firstName}</p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
              className='bg-red-50'
                alt="Tailwind CSS Navbar component"
                src={user?.user?.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-red-500 text-white rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge shadow">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
    </div>

      </div>   
      }
    </div>
  )
}

export default Navbar
