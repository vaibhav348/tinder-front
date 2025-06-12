import React, { useState } from 'react'
import { AwardIcon, Eye, EyeOff } from 'lucide-react'; // or use Heroicons if you prefer
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const navigate = useNavigate()

  const [mode, setMode] = useState("SignUp")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [passVis, setPassVis] = useState(false);
  const dispatch = useDispatch()
  const nameRegex = /^[A-Za-z]{2,20}$/;
  const handleSignUp = async (e) => {
    setError("")

    e.preventDefault();
    if (!nameRegex.test(firstName)) return setError("Invalid First Name (only letters, 2–20 chars)");
    if (!nameRegex.test(lastName)) return setError("Invalid Last Name (only letters, 2–20 chars)");

    try {
      const res = await axios.post(BASE_URL + "/singup",
        {
          firstName,
          lastName,
          emailId: email,
          password
        },
        {
          withCredentials: true,
        })
      console.log(res.data);
      dispatch(addUser(res.data.data))
      if (res.status >= 200 && res.status < 300) {
        navigate("/")
      }
      return res;
    } catch (err) {
      setError(err.response.data)
      console.log(err.response.data);

    }

  }
  const handleLogin = async (e) => {
    setError("")
    try {
      e.preventDefault();
      // console.log(email, password );
      const res = await axios.post(BASE_URL + "/login", {
        emailId: email, password
      }, {
        withCredentials: true
      })
      // console.log(res)
      dispatch(addUser(res.data.user))
      return navigate("/")
    } catch (err) {
      setError(err.response.data.message)
    }

  }
  return (
    <div className="flex  justify-center items-start min-h-screen pt-4 bg-gray-900 text-white">
      <form
        onSubmit={(e) => mode == "Login" ? handleLogin(e) : handleSignUp(e)}

        className="flex items-center justify-center relative my-4 px-4 w-full max-w-sm bg-[#111827] bg-opacity-80 rounded-2xl shadow-lg border border-gray-700 hover:shadow-purple-600/60 transition-all duration-300 backdrop-blur-md"
      >
        {/* Glowing Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-25"></div>

        {/* Content */}
        <div className="relative z-10 p-6 space-y-2">

          {

            mode == "SignUp" ?
              (
                <>
                  {/* firstname Field */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-200 mb-1">
                      First Name
                    </label>
                    <input
                      maxLength={20}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="firstName"
                      id="firstName"
                      placeholder="Enter First Name"
                      className="w-full px-3 py-2 my-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  {/* lastname Field */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-200 mb-1">
                      Last Name
                    </label>
                    <input
                      maxLength={20}

                      onChange={(e) => setLastName(e.target.value)}
                      type="lastName"
                      id="lastName"
                      placeholder="Enter Last Name"
                      className="w-full px-3 py-2 my-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </>

              ) : (
                ""
              )
          }
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-1">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 my-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-1">
              Password
            </label>
            <div className="flex gap-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={passVis ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                className="w-full px-3 py-2 my-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setPassVis(!passVis)}
                className={`px-3 py-2 my-2 rounded-lg border text-white transition-all 
    ${passVis
                    ? 'bg-purple-700 border-purple-600'
                    : 'bg-[#111827] bg-opacity-80 border-gray-700'}`}
              >
                {passVis ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

            </div>
            {error && <p className="text-red-500 text-center pb-2 text-sm mt-1">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {mode == "SignUp" ? "SignUp" : "Login"}

          </button>
          {
            mode == "SignUp" ?
              (<p className='text-center text-sm'>Already Registerd ? <span onClick={() => {
                setError("")

                setMode("Login")
              }
              } className=' cursor-pointer font-semibold text-purple-400'>Login</span></p>
              )
              : (<p className='text-center text-sm'>New User ? <span onClick={() => {
                setMode("SignUp")
                setError("")
              }
              } className=' cursor-pointer font-semibold text-purple-400'>SignUp</span></p>
              )
          }
          {/* <p className='text-center text-sm'>New User ? <span onClick={() =>
            setMode("SignUp")
          } className=' cursor-pointer font-semibold text-purple-400'>SignUp</span></p> */}

        </div>
      </form>
    </div>

  )
}

export default Login