import React from 'react'
import './booking.css'
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios'
import './bookingServices.css'


const BookingAvailability = () => {

    const [availableData, setAvailableData]=useState([])
    const [data, setData]=useState([])
    const [proceed, setProceed]=useState(false)

    const updateData = e => {
        setAvailableData({
            ...availableData,
            [e.target.name]: e.target.value
        })
    }

    const form = useRef();

    const handleSubmitForm = async (e)=>{
        e.preventDefault();

        console.log(availableData);
        const response = await axios.post('http://localhost:8000/get_available_services',availableData).then((res)=>{
            let resData = res.data.data
            setData(resData)
            setProceed(true)
            console.log(data);
        })
    }


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
                        <option value="1">1 adult</option>
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
                            <div>
                                <h4 style={{color:'yellow'}}>{item.title}</h4>
                                <h2>{item.service}</h2>
                                <p>{item.description}</p>
                            </div>
                            <div className='bservices__btn'> 
                                <button type='submit' className='btn btn-primary'>Add Service</button>
                                <h4 className='bservices__price'>₹ {item.amount}/-</h4>
                            </div>
                            </div>
                        </div>
                        </session> 
                    )
                    })
                }
                <div className='btnClass'>
                    <a href='/proceed' type='submit' className='btn btn-primary bservices__btn-proceed'>PROCEED</a>
                </div>

                </section>
                : ''
        }
    </div>
  )
}

export default BookingAvailability