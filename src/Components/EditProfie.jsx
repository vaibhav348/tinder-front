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
    const [age, setAge] = useState(userData?.age);
    const [gender, setGender] = useState(userData?.gender);
    const [about, setAbout] = useState(userData?.about);
    const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl)
    const [error, setError] = useState("")
    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch()

 const saveProfile = async (e) => {
    setError("")
    e.preventDefault(); // Stop page refresh

    try {
        const res = await axios.patch(BASE_URL + "/profile/edit", {
            firstName,
            lastName,
            age,
            about,
            gender,
            photoUrl,
        }, {
            withCredentials: true
        });
        // console.log("result", res.data.data);
        dispatch(addUser(res?.data?.data));
        setShowToast(true)
        const i = setTimeout(()=>{
            setShowToast(false)
        }, 3000)
    } catch (error) {
        setError(error.response.data)
        console.log(error.message);
    }
};

    return (
        <>
        <div className='h-screen  bg-gray-100 ' >

            <p className='flex justify-center items-center py-6 text-xl font-semibold'>Edit Profile</p>
            <div className="flex justify-center  items-start items-start ">
                <form   onSubmit={saveProfile} className="bg-white mx-10 p-6 rounded-xl shadow-lg w-full max-w-sm">
                    {/* //firstName */}
                    <div className="mb-2">
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                            FirstName
                        </label>
                        <input
                            onChange={(e) => { setFirstName(e.target.value) }}
                            type="firstName"
                            id="firstName"
                            value={firstName}
                            placeholder="Enter firstName"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        />
                    </div>

                    {/* Lastname  */}
                    <div className="mb-2">
                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                            lastName
                        </label>
                        <input
                            onChange={(e) => { setLastName(e.target.value) }}
                            type="lastName"
                            id="lastName"
                            value={lastName}
                            placeholder="Enter lastName"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        />
                    </div>
                    {/* photoUrl  */}
                    <div className="mb-2">
                        <label htmlFor="photoUrl" className="block text-gray-700 font-medium mb-2">
                            PhotoUrl
                        </label>
                        <input
                            onChange={(e) => { setPhotoUrl(e.target.value) }}
                            type="photoUrl"
                            id="photoUrl"
                            value={photoUrl}
                            placeholder="Enter photoUrl"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        />
                    </div>

                    {/* age  */}
                    <div className="mb-2">
                        <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                            age
                        </label>
                        <input
                            onChange={(e) => { setAge(e.target.value) }}
                            type="age"
                            id="age"
                            value={age}
                            placeholder="Enter age"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        />
                    </div>

                    {/* gender  */}
                    <div className="mb-2">
                        <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                            gender
                        </label>
                        <input
                            onChange={(e) => { setGender(e.target.value) }}
                            type="gender"
                            id="gender"
                            value={gender}
                            placeholder="Enter gender"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        />
                    </div>

                    {/* about  */}
                    <div className="mb-2">
                        <label htmlFor="about" className="block text-gray-700 font-medium mb-2">
                            about
                        </label>
                        <input
                            onChange={(e) => { setAbout(e.target.value) }}
                            type="about"
                            id="about"
                            value={about}
                            placeholder="Enter about"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        />
                    </div>
{
    error && <p className='text-red-600 p-2 font-semibold text-xs'> {error}</p>
}

                    <button
                        type="submit"
                                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
                <div className='mx-10'>
                    <UserCard user={{ firstName, lastName, photoUrl, age, about, gender }} />
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