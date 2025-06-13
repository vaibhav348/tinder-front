import React, { useState } from 'react'
import { AwardIcon, Eye, EyeOff } from 'lucide-react'; // or use Heroicons if you prefer
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const EditProfie = ({ userData }) => {
  const navigate = useNavigate()
  {
    console.log(userData);

  }


  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [age, setAge] = useState(userData?.age || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [about, setAbout] = useState(userData?.about || "");
  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl)
  const [skills, setSkills] = useState(userData?.skills || [])
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [showToast, setShowToast] = useState(false)

  const dispatch = useDispatch()
const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };
  const addSkill=async(e)=>{
    e.preventDefault()
    const trimmed = input.trim();
    if (!trimmed) return;
      if (skills.includes(trimmed)) {
      alert("Skill already added");
      return;
    }
   
    setSkills([...skills, trimmed]);
    setInput('');
    console.log(skills);
    
  }

  const saveProfile = async (e) => {
    setError("")
    e.preventDefault(); // Stop page refresh

    const nameRegex = /^[A-Za-z]{2,20}$/;
    const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|bmp|svg)(\?.*)?$/i;


    if (!nameRegex.test(firstName)) return setError("Invalid First Name (only letters, 2–20 chars)");
    if (!nameRegex.test(lastName)) return setError("Invalid Last Name (only letters, 2–20 chars)");
    try {
      new URL(photoUrl);
      if (!photoUrl.startsWith("http")) throw new Error();
    } catch {
      return setError("Invalid Photo URL");
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) return setError("Age must be between 13 and 120");

    const allowedGenders = ["male", "female", "others"];
    if (!allowedGenders.includes(gender)) return setError("Gender must be male, female Or others.");
    if (!about || about.length < 10 || about.length > 250) return setError("About must be 10 to 250 characters");

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName,
        lastName,
        age,
        about,
        gender,
        photoUrl,
        skills
      }, {
        withCredentials: true
      });
      // console.log("result", res.data.data);
      dispatch(addUser(res?.data?.data));
      setShowToast(true)
      const i = setTimeout(() => {
        setShowToast(false)
      }, 3000)
    } catch (error) {
      setError(error.response.data)
      console.log(error.message);
    }
  };

  return (
    <>
      <div className='p-2 min-h-[90vh]  pb-20  bg-gray-900 text-white' >

        <p className='text-center py-6 text-xl text-gray-400 font-mono font-semibold'>Edit Profile</p>
        <div className=" flex justify-center gap-10">
          <form
            onSubmit={saveProfile}
            className="relative my-4 px-4 min-w-[30vw] w-auto bg-[#111827] bg-opacity-80 rounded-2xl shadow-lg border border-gray-700 hover:shadow-purple-600/60 transition-all duration-300 backdrop-blur-md max-w-md "
          >
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-sm opacity-25"></div>

            {/* Actual content */}
            <div className="relative z-10 p-5 space-y-2 text-white">

              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-200 mb-1">First Name</label>
                <input
                  maxLength={20}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    if (firstName.length > 20) return setError("Invalid First Name (only letters, 2–20 chars)");
                  }}
                  value={firstName}
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  className="w-full flex-1 px-3 py-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-200 mb-1">Last Name</label>
                <input
                  maxLength={20}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    if (lastName.length > 20) return setError("Invalid Last Name (only letters, 2–20 chars)");

                  }}
                  value={lastName}
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  className="w-full flex-1 px-3 py-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Photo URL */}
              <div>
                <label htmlFor="photoUrl" className="block text-sm font-semibold text-gray-200 mb-1">Photo URL</label>
                <input
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  value={photoUrl}
                  type="text"
                  id="photoUrl"
                  placeholder="Enter photo URL"
                  className="w-full flex-1 px-3 py-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-gray-200 mb-1">Age</label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 3 && +value <= 999) {
                      setAge(value);
                    }
                  }}
                  value={age}
                  type="number"
                  id="age"
                  placeholder="Enter age"
                  min={0}
                  max={999}
                  className="w-full flex-1 px-3 py-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>


              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-semibold text-gray-200 mb-1">Gender</label>
                <input
                  maxLength={10}
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  type="text"
                  id="gender"
                  placeholder="Enter gender"
                  className="w-full flex-1 px-3 py-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* About */}
              <div>
                <label htmlFor="about" className="block text-sm font-semibold text-gray-200 mb-1">About</label>
                <input
                  maxLength={250}
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  type="text"
                  id="about"
                  placeholder="Enter about"
                  className="w-full  
                  
                  flex-1 px-3 py-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              {/* skills  */}
              <div>
                <label htmlFor="skills" className="block text-sm font-semibold text-gray-200 mb-1">Skills</label>
                <div className = "flex flex-col sm:flex-row gap-2">

                <input
                  maxLength={20}
                  minLength={1}
                  onChange={(e) => setInput(e.target.value)}
                  // onKeyDown={handleKeyDown}
                  value={input}
                  type="text"
                  id="skills"
                  placeholder="Enter Skills"
                  className="flex-1 px-3 py-2 rounded-lg bg-[#111827] bg-opacity-80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />

                <button
                  disabled={skills.length >= 10}
        onClick={addSkill}
         className={`px-4 py-2 rounded-lg border text-white transition-all ${
        skills.length >= 10 ? 'bg-gray-400 text-gray-900 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
      }`}
  >
        Add Skill
      </button>
          </div>

    <div className='flex flex-wrap gap-2 my-2 max-h-48 overflow-y-auto max-w-full'>
  {
    skills.map((skill, index) => (
      <p
        key={index}
        className='text-sm bg-gray-200 text-purple-900 rounded px-2 py-1 flex-grow basis-[calc(25%-0.5rem)] text-center'
      >
        {skill}
      </p>
    ))
  }
</div>

              </div>


              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>

          <div className=''>
            <UserCard user={{ firstName, lastName, photoUrl, age, about, gender, skills }} />
          </div>
        </div>

      </div>
      {
        showToast ? (<div className="toast toast-top toast-end">

          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>) : " "
      }
    </>
  )
}

export default EditProfie