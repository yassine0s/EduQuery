import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
}
  from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../configs/authConfig";

const Login = () => {

  const navigate = useNavigate();
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginPopup(loginRequest).then((data) => {
      const username = data.account?.username;
      const name = data.account?.name;
      console.log("HELLO");
      console.log(data.account);
      // login_create_api({email: username, name}).then(data => console.log(data));
      navigate("/")
    })
      .catch((error) => console.log(error));
  }
  return (
    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6' className='mt-auto mb-auto'>
          <MDBBtn className="mb-4 w-50" size="lg" style={{ backgroundColor: '#3b5998' }} onClick={handleLogin}>
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            Login with University Email
          </MDBBtn>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;