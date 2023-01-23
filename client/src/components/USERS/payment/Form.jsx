import React from 'react'
import './form.css'
import {TfiEmail} from 'react-icons/tfi'
import {RiMessengerLine} from 'react-icons/ri'
import {MdDriveFileRenameOutline} from 'react-icons/md'
import { useRef, useState } from 'react';
import emailjs from 'emailjs-com'



  

const FormDetails = () => {
  const [data, setData] = useState({})

    const updateData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
  
    
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    console.log(data);
    
  };





  return (
    <section id='form'>
      <h5>Fill your Details</h5>
      <h2>Form</h2>

      <div className='container form__container'>
        
        <form ref={form} onSubmit={sendEmail} >
          
          <div className='form_div'>
            <input onChange={updateData} type="text" name='name' placeholder='Full Name' required/>
            <input onChange={updateData} type="email" name='email' placeholder='Email ID' required/>
            <input onChange={updateData} type="number" name='mobile' placeholder='Mobile Number' required/>
          
            <input onChange={updateData} type="text" name='address' placeholder='Address' required/>
            <input onChange={updateData} type="text" name='city' placeholder='City' required/>
            <input onChange={updateData} type="text" name='state' placeholder='State' required/>
          
            <input onChange={updateData} type="text" name='country' placeholder='Country' required/>
            <input onChange={updateData} type="text" name='zipcode' maxLength='6' placeholder='Zip Code' required/>
            <input onChange={updateData} type="text" name='phone' placeholder='Phone' required/>

          </div>
          <textarea name="message"  rows="3" placeholder='Extras_suggestions'></textarea>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </section>
  )
}

export default FormDetails