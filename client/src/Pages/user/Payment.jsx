import React from 'react'
import PaymentNav from '../../components/USERS/nav/PaymentNav'
import BookingDetails from '../../components/USERS/payment/BookingDetails'
import Form from '../../components/USERS/payment/Form'
import Footer from '../../components/USERS/footer/Footer'

const Payment = () => {
  return (
    <>
        <PaymentNav/>
        <Form/>
        <BookingDetails/>
        <Footer/>
    </>
  )
}

export default Payment