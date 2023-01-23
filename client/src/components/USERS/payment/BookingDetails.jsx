import React from "react";
import './bookingDetails.css'
import { useState, useEffect } from 'react'
import {axiosAdminInstance} from '../../../Instance/Axios'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";  
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

export default function ProductCards() {
    const [data, setData]=useState([]);

    useEffect(()=>{
        getServices();
    },[])



    const getServices = ()=>{
        return new Promise(async(resolve, reject)=>{
            const response = await axiosAdminInstance.get('/services').then((data)=>{
                let ServiceData = data.data.allServices
                setData(ServiceData)
                resolve()
            }).catch((e)=>{
                console.log(e);
            })
        })
    }


        return (
        <section className="h-100" style={{ backgroundColor: "transparent" }}>
            <h5>Selected Details</h5>
            <h2>Carts</h2>
            
            <MDBContainer className="py-5 h-100">
                            <MDBRow  className="justify-content-center align-items-center h-100">
                            <MDBCol  md="12">
                                
                            {
                                data.map((item)=>{
                                    return(
                                        <MDBCard style={{ backgroundColor: "transparent" }}  className="rounded-3 mb-6">
                                        <MDBCardBody className="p-4">
                                            <MDBRow className="justify-content-between align-items-center">
                                            <MDBCol md="2" lg="2" xl="2">
                                                <MDBCardImage className="rounded-3" fluid
                                                src={item.img1_url}
                                                alt="Cotton T-shirt" />
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="3">
                                                <p className="lead fw-normal mb-2">{item.service}</p>
                                                <p>
                                                <span className="text-muted">{item.title}</span>
                                                {/* <span className="text-muted">Color: </span>Grey */}
                                                </p>
                                            </MDBCol>

                                            <MDBCol md="3" lg="3" xl="2"
                                                className="d-flex align-items-center justify-content-around">
                                                <MDBBtn style={{border:'none'}} color="link" className="px-2">
                                                        <ArrowBackRoundedIcon />
                                                </MDBBtn>
        
                                                    <MDBInput min={0} defaultValue={2} type="number" size="sm" />
        
                                                <MDBBtn style={{border:'none'}}  color="link" className="px-2">
                                                <ArrowForwardRoundedIcon/>
                                                </MDBBtn>
                                            </MDBCol>
        
                                            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1 " >
                                                <MDBTypography style={{fontStyle: 'italic'}} tag="h4" className="mb-0">
                                                ₹ {item.amount}
                                                </MDBTypography>
                                            </MDBCol>
                                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                <a href="#!" className="text-danger">
                                                <MDBIcon fas icon="trash text-danger" size="lg" />
                                                </a>
                                            </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                        </MDBCard>        
                                    )
                                })
                            }
                                <h2 className="FinalAmount">
                                    Total Amount : ₹ 10,000/-
                                </h2>
                                <button className="apply_button btn btn-primary mt-5">
                                    Register Your Booking
                                </button>
                            </MDBCol>
                            </MDBRow>
                        </MDBContainer>
        
        </section>
        );
}