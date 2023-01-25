import React from 'react'
import './nav.css'
import {Link} from 'react-router-dom'

import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {RiServiceLine} from 'react-icons/ri'
import {TiMessages} from 'react-icons/ti'
import {TfiGallery} from 'react-icons/tfi'
import { useState } from 'react'
import {FiGrid} from 'react-icons/fi'


const ProfileNav = () => {
  const [activeNav, setActiveNav]=useState('profile')
  console.log(activeNav);


  return (
    <nav>
      <Link to="/" >
          <AiOutlineHome/>
      </Link>
      
      {/* <a href="#about" 
        onClick={()=>setActiveNav('#about')} 
        className={activeNav === '#about' ? 'active' : ''}>
        <AiOutlineUser/>
      </a> */}

      <a href={activeNav}
        // onClick={()=>setActiveNav('/gallery')}
        className={activeNav === 'profile' ? 'active' : ''}>
        <AiOutlineUser/>
      </a>

      <Link to='/booking'>
        <FiGrid/>
      </Link>
    </nav>
  )
}

export default ProfileNav