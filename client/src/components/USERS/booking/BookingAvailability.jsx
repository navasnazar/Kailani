import React from 'react'
import './booking.css'
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import './bookingServices.css'
import {getAvailableDate} from '../../../redux/userReducer'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const BookingAvailability = () => {

   

    const userId = useSelector((state) => state.user.loginUserDetails.userID);
    const user = useSelector((state)=>state.user.loginUserDetails)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [availableData, setAvailableData]=useState([])
    const [data, setData]=useState([])
    const [proceed, setProceed]=useState(false)
    const [buttonActive, setButtonActive]=useState(true)
    const [proceedErr, setProceedErr]=useState('')
    const [selectedData, setSelectedData]=useState(false)
    const [userCart, setUserCart]=useState()
    const [render, setRender]=useState(0)
    const [buttonShow, setButtonShow]=useState(true)



    useEffect(() => {
        getCart();
    }, [render])

    console.log('RENDER',render);
    

    const getCart = ()=>{
        return new Promise(async(resolve, reject)=>{
            await axios.get(`http://localhost:8000/getUserCart/${userId}`).then((resp)=>{
                if(resp.data.status=='done'){
                    setUserCart(resp.data.data.services)
                    resolve()
                }
                if(resp.data.status=='err'){
                    console.log('error:', resp);
                }
            }).catch((err)=>{
                console.log(err);
            })
        })
    }

    const updateData = e => {
        setAvailableData({
            ...availableData,
            [e.target.name]: e.target.value
        })
    }

    const form = useRef();

    const handleSubmitForm = async (e)=>{
        e.preventDefault();
        dispatch(getAvailableDate(availableData))
        const response = await axios.post('http://localhost:8000/get_available_services',availableData).then((res)=>{
            let resData = res.data.data
            setData(resData)
            setProceed(true)
        })
    }

    const selectService = async (data)=>{
        setSelectedData(true)
        console.log('service id: ',selectedData);
        const response = await axios.post('http://localhost:8000/addtoCart',{user: user, id: data, bookingDetails: availableData}).then((resp)=>{
            let xxx = Math.random()
            console.log('bbbbb',xxx); 
            setRender(xxx)
        })
    }
    const selectRMService = async (data)=>{
        console.log('service id: ',data);
        setSelectedData(false)
        const response = await axios.post('http://localhost:8000/removetoCart',{user: user, id: data, bookingDetails: availableData}).then((resp)=>{
            let xxx = Math.random()
            console.log('bbbbb',xxx);    
            setRender(xxx)

        })
    }

    const dateSubmition = async ()=>{
        const response = await axios.post('http://localhost:8000/dateConfirm',{user: user, bookingDetails: availableData}).then((resp)=>{
           
            if(resp.data.status=='done'){
                setProceedErr('')
                navigate('/proceed')
            }
            if(resp.data.status=='err'){
                setProceedErr('***Please select any Service')
            }
        })
    }

    const buttonChange = async(id)=>{
        console.log('ididididid : ', id);
        try{
            let x = await userCart.find(element => element.serviceID = id)
            if(x.serviceID==id){
                setButtonShow(false)
                return(true)
            }else{
                setButtonShow(true)
                return(false)
            }
       
        }catch(err){
            console.log(err);
        }
    }
    console.log('xxxx',buttonShow);


  return (
    <div>
        <section className="availability" id="availability">
            <form ref={form} onSubmit={handleSubmitForm}>
                <div className="flex">
                    <div className="box">
                        <p>Check in</p>
                        <input onChange={updateData} type="date" name="check_in" className="input" required/> 
                    </div>
                    <div className="box">
                        <p>Check out</p>
                        <input onChange={updateData} type="date" name="check_out" className="input" required/>
                    </div>
                    <div className="box">
                        <p>Adults</p>
                        <select onChange={updateData} name="adults" className="input" required>
                        <option selected value="1">1 adult</option>
                        <option value="2">2 adults</option>
                        <option value="3">3 adults</option>
                        <option value="4">4 adults</option>
                        <option value="5">5 adults</option>
                        <option value="6">6 adults</option>
                        </select>
                    </div>
                    <div className="box">
                        <p>Childs</p>
                        <select onChange={updateData} name="childs" className="input" required>
                        <option value="-">0 child</option>
                        <option value="1">1 child</option>
                        <option value="2">2 child</option>
                        <option value="3">3 child</option>
                        <option value="4">4 child</option>
                        <option value="5">5 child</option>
                        <option value="6">6 child</option>
                        </select>
                    </div>
                    <div className="box">
                        <p>Rooms</p>
                        <select onChange={updateData} name="rooms" className="input" required>
                        <option value="1">1 room</option>
                        <option value="2">2 rooms</option>
                        <option value="3">3 rooms</option>
                        <option value="4">4 rooms</option>
                        <option value="5">5 rooms</option>
                        <option value="6">6 rooms</option>
                        </select>
                    </div>
                </div>
                <button type='submit' className='btn btn-primary'>Check Availability</button>
                {/* <input type="submit" value="check availability" name="check" className="btn"/> */}
            </form>
        </section>
        {
            proceed ?
            <section id='bServices'>
                {
                    data.map((item, index)=>{
                    return(
                       
                        <session>
                        <div key={index} className="container bservices__container">
                            <div className="bservices__pic">
                                <div className="bservices__pic-image">
                                    <img src={item.img1_url} alt='' />
                                </div>
                            </div>
                            <div className="bservices__content">
                            <div >
                                <h4 style={{color:'yellow'}}>{item.title}</h4>
                                <h2>{item.service}</h2>
                                <p>{item.description}</p>
                            </div>
                            <div className='bservices__btn'>
                                {
                                   userCart ?

                                            userCart.find(element => element.serviceID == item._id)
                                            ?
                                            <button type='submit' onClick={()=>selectRMService(item._id)} className='btn '>Remove Service</button>
                                            :
                                            <button type='submit' onClick={()=>selectService(item._id)} className='btn btn-primary'>Add Service</button>
                                    :
                                    <button type='submit' onClick={()=>selectService(item._id)} className='btn btn-primary'>Add Service</button> 
                                }
                                <h4 className='bservices__price'>₹ {item.amount}/-</h4>
                            </div>
                            </div>
                        </div>
                        </session> 
                    )
                    })
                }
                    <div className='btnClass'>
                        <div>
                            <p className='validation_select'>{proceedErr}</p>
                            <button onClick={dateSubmition} type='submit' className='btn btn-primary bservices__btn-proceed'>PROCEED</button>
                        </div>
                    </div>
                </section>
                : ''
        }
    </div>
  )
}

export default BookingAvailability