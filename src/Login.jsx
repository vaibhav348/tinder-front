import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'; // or use Heroicons if you prefer


const Login = () => {
    const [passVis, setPassVis]  = useState(false);
    return (
        <div className="flex justify-center items-start h-screen pt-16 bg-gray-100">
  <form action="" className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
        Email
      </label>
      <input
        type="text"
        id="email"
        placeholder="Enter Email"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
        Password
      </label>

      <div className='flex gap-2'>
      <input
        type={ passVis ? "text" : "password"}
        id="password"
        placeholder="Enter Password"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
        <button 
        type= "button"
      onClick={()=>setPassVis(!passVis)}
        className='w-13 flex justify-center items-center text-xl bg-gray-500 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300'>
            {passVis ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        </div>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Login
    </button>
  </form>
</div>

    )
}

export default Login