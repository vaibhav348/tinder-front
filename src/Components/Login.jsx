import React, { useState } from 'react'
import { AwardIcon, Eye, EyeOff } from 'lucide-react'; // or use Heroicons if you prefer
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [passVis, setPassVis] = useState(false);
const dispatch = useDispatch()

  const handleLogin=async(e)=>{
    try{
    e.preventDefault();
    // console.log(email, password );
      const res = await axios.post(BASE_URL+"/login",{
        emailId : email, password
      },{
        withCredentials : true
      })
      // console.log(res)
      dispatch(addUser(res.data.user))
      return navigate("/")
    }catch(err){
      setError(err.response.data.message)
    }
              
  }
  return (
    <div className="flex justify-center items-start h-screen pt-16 bg-gray-100">
      <form action="" className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email 
          </label>
          <input
          onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            id="email"
            placeholder="Enter Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>

          <div className='flex gap-2'>
            <input
          onChange={(e)=>{setPassword(e.target.value)}}

              type={passVis ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
            <button
              type="button"
              onClick={() => {setPassVis(!passVis) 
                
              }}
              className='w-13 flex justify-center items-center text-xl bg-gray-500 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300'>
              {passVis ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        <p className='text-red-600 pt-2 pl-2'>{error}</p>
        </div>
        <button
          type="submit"
          onClick={(e)=>handleLogin(e)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>

  )
}

export default Login