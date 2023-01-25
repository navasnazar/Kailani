import React from 'react'
import './logout.css'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {getUserLoginDetails} from '../../../redux/userReducer'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Logout = () => {

  const user = useSelector((state)=>state.user.loginUserDetails)

  const [logout, setLogout]=useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if(token){
      setLogout(true)
    }
  }, [logout])



    const logoutFunction = ()=>{
        console.log('logout clicked');
        localStorage.removeItem('userToken')
        dispatch(getUserLoginDetails(false))
        setLogout(false)
      }

  return (
    <div>
        {
            user ?
            <div className='sticky_logout'>
                <RiLogoutCircleRLine onClick={logoutFunction}  className='sticky_icon'/>
                <p className='stickey_name'>{user.user}</p>
            </div> : ''
        }
    </div>
    
  )
}

export default Logout