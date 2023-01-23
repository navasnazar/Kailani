import React from 'react'
import './login.css'
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const {token} = useParams()

  const navigate = useNavigate();


  const [pass, setPass]=useState('')
  const [rePass, setRePass]=useState('')

  const handleResetPassSubmit = async (e)=>{
    e.preventDefault();
    let password = {password: pass}
    let resetPassword = await axios.post('http://localhost:8000/admin/resetpass',password,
    {
      headers: {Authorization: token}
    }
    ).then((response)=>{
      let data1 = response.data
      console.log('resetpass response:->',data1);
      if(data1.status==='done'){
        navigate('/admin/login')
      }
    })
  }

  return (
    <section>
       <div >
                <form onSubmit={handleResetPassSubmit}>
                      <input 
                        type="password" 
                        name='password' 
                        placeholder='password' 
                        required
                        onChange={(e)=>setPass(e.target.value)}
                      />
                      <input 
                        type="password" 
                        name='rePassword' 
                        placeholder='repeat password' 
                        required
                        onChange={(e)=>setRePass(e.target.value)}
                      />
                      <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
    </section>
  )
}

export default ResetPassword
