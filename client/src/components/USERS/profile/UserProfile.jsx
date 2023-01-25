import React, { useEffect, useState } from 'react';
import './userProfile.css'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

import BookingHistory from './BookingHistory';

export default function ProfilePage() {

  const [userDet, setUserDet]=useState({})

  const userId = useSelector((state) => state.user.loginUserDetails.userID);


  useEffect(async() => {
    const response = await axios.post(`http://localhost:8000/getUserDetails/${userId}`).then((resp)=>{
      let userDetails =  resp.data.data 
      setUserDet(userDetails)
    })
  }, [])
  

  return (
    <section style={{ backgroundColor: 'black' }}>
      <MDBContainer className="py-5">
        

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4 card-body">
              <MDBCardBody className="text-center align-items-end">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle image_field"
                  style={{ width: '150px', }}
                  fluid />
                <p className="text-muted text-white mb-1">{userDet.email}</p>
                <p className="text-muted mb-4"> +91 {userDet.mobile}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Link to='/'><MDBBtn>Back to Home</MDBBtn></Link>
                </div>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDet.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDet.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(+91) {userDet.mobile}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"> </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

          


          </MDBCol>
          <BookingHistory/>

        </MDBRow>
      </MDBContainer>
    </section>
  );
}