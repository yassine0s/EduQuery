import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBContainer,
 
} from "mdb-react-ui-kit";
export default function userDetails() {
  return (
    <div className="mt-5">
      <MDBContainer breakpoint="sm">
        <MDBRow className="g-5">
          <MDBCol>
            <MDBInput id="form11Example4" label="Username" />
            <br></br>
            <MDBInput id="form11Example4" label="Type" />
          </MDBCol>
          <MDBCol>
            <MDBInput id="form11Example4" label="First Name" />
            <br></br>
            <MDBInput id="form11Example4" label="Last Name" />
          </MDBCol>
          <MDBCol>
            <MDBInput id="form11Example4" label="Email" />
            <br></br>
          </MDBCol>
        </MDBRow>
        <br></br>
        <MDBBtn className="mt-3" color="dark">
          Save
        </MDBBtn>
      </MDBContainer>
    </div>
  );
}
