import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import './bookingHistory.css'
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

const BookingHistory = () => {
  return (
    <div>
        <section style={{ backgroundColor: 'black' }}>
        <MDBContainer className="py-5">
          

          <MDBRow>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">CVVV</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">FFFF</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">(+91) DDD</MDBCardText>
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
    </div>
  )
}

export default BookingHistory