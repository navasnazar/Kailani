import React, { useEffect, useState } from 'react'
import Header from '../../components/USERS/header/Header'
import About from '../../components/USERS/about/About'
import Services from '../../components/USERS/services/Services'
import Testimonials from '../../components/USERS/testimonials/Testimonials'
import Contact from '../../components/USERS/contact/Contact'
import HomeNav from '../../components/USERS/nav/HomeNavWithRigister'
import Footer from '../../components/USERS/footer/Footer'
import jwt from 'jwt-decode'
import {useDispatch} from 'react-redux'
import {getUserLoginDetails} from '../../redux/userReducer'
import Logout from '../../components/USERS/logout/Logout'
import { FaBullseye } from 'react-icons/fa'

const Home = () => {
  const [reload, setReload]=useState(FaBullseye)


  useEffect(() => {
    console.log('home reload');
    const token = localStorage.getItem('userToken')
    if(token){
     
      setReload(true)

      // if (user) {
      //   navigate('/');
      // } else {
      //   navigate('/userLogin');
      // }
    }
    // else {
      // navigate('/userLogin');
    // }
  }, [reload])

  
  return (
    <>  
      {reload? <Logout /> : ''}
      <Header/>
      <HomeNav/>
      <About/>
      <Services/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default Home