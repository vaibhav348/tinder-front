import React from 'react'
import EditProfie from './EditProfie'
import { useSelector } from 'react-redux'

const Profile = () => {
      const userData = useSelector((store) => store.user)

  return (
 
   <div className=''>
   <EditProfie userData={userData}/>
    </div>
 
    
  )
}

export default Profile