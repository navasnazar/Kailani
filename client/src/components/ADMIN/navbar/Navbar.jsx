import React from 'react'
import './navbar.css'
import {BsSearch} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Navbar = () => {
  return (
    <div className='main_navbar_container'>
      <div className='dashboard_container'>
        <h2>Dashboard</h2>
      </div>
      <div className='search_container'>
        <div className='search_icon'><BsSearch/></div>
        <input placeholder='Search' className='search_input' style={{height:'10px'}} type="search" />
      </div>
      <div className='profile_container'>
        <div className='profile_items'>
          <p>Navas Nazar</p>
          <div className='profile_icon'><FiLogOut/></div> 
        </div>
      </div>
    </div>
  )
}

export default Navbar