import React from 'react'
import './login.css'

import { useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AdminLogin = () => {

  const navigate = useNavigate();

  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [loginErr, setLoginErr]=useState('')
  const [loginPassErr, setLoginPassErr]=useState('')
  const [forPass, setForPass]=useState(false)
  const [reqMail, setReqMail]=useState('')
  const [resetPass, setResetPass]=useState('')
  const [passField, setPassField]=useState(false)
  const [auth, setAuth]=useState('')


  useEffect(()=>{
    const adminData = localStorage.getItem("adminData")
    if(adminData){
      window.location.href='/admin'
    }
    
  })

  const handleRecPassword = async (e)=>{
    e.preventDefault();
    console.log('recovered mail id: ', reqMail);
    const recMail = await axios.post('http://localhost:8000/admin/recovermail',{reqMail}).then((response)=>{
      let data = response.data
      console.log(data);
      setForPass(false)
      setResetPass(data.msg)
      // setPassField(true)
      console.log('sssss',data.access_Token);
      setAuth(data.access_Token)
    })

  }


  const handleSubmit = async (e)=>{
    let data = {
      username: username,
      password: password
    }
    e.preventDefault();
    const response = await axios.post('http://localhost:8000/admin/login',data).then((res)=>{
      let resData = res.data
      console.log(resData);
      if(resData.status==='done'){
        localStorage.setItem("admin",resData.admin)
        navigate('/admin')
      }
      if(resData.status=='username Err') setLoginErr('Invalid Username')
      if(resData.status=='password Err') setLoginPassErr('Invalid Password')
      
    })
  }

  return (
    <section id='admin__login'>
        <h5>Admin Section</h5>
        <h2>Admin Login</h2>
        <h5 style={{color:'orange'}}>{loginErr}</h5>
        <h5 style={{color:'orange'}}>{loginPassErr}</h5>

        <div className='container contact__container'>
          
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              name='username' 
              placeholder='Username' 
              required
              onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
              type="password" 
              name='password' 
              placeholder='Password' 
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
            <a onClick={()=>setForPass(!forPass)}>forgot password ?</a>
            <button type='submit' className='btn btn-primary'>Login</button>
          </form>
          <div> {
          forPass ? 
            <form onSubmit={handleRecPassword}>
              <input 
                type="email" 
                name='reqUsername'
                placeholder='Enter your recovered Mail ID:' 
                required
                onChange={(e)=>setReqMail(e.target.value)}
              />
              <button type='submit' className='btn btn-primary'>Send</button>
            </form> : ''}  
            <h5 style={{color:'orange'}}>{resetPass}</h5>
          </div>
        </div>
      
    </section>
  )
}

export default AdminLogin