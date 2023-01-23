import React from 'react'
import Header from '../../components/USERS/header/Header'
import About from '../../components/USERS/about/About'
import Services from '../../components/USERS/services/Services'
import Testimonials from '../../components/USERS/testimonials/Testimonials'
import Contact from '../../components/USERS/contact/Contact'
import HomeNav from '../../components/USERS/nav/HomeNavWithRigister'
import Footer from '../../components/USERS/footer/Footer'

const Home = () => {
  return (
    <>
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