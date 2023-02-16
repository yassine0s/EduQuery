import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../configs/authConfig";

const Login = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((data) => {
        const username = data.account?.username;
        const name = data.account?.name;
        console.log("HELLO");
        console.log(data.account);
        // login_create_api({email: username, name}).then(data => console.log(data));
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img src="./login.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col="4" md="4" className="mt-auto mb-auto">
          <p className="text-center">Login</p>

          <MDBInput
            className="mb-4"
            type="email"
            id="1"
            label="Email address"
          />
          <MDBInput className="mb-4" type="password" id="2" label="Password" />

          <MDBBtn
            className="mb-4 w-100"
            size="sm"
            style={{ backgroundColor: "#0E538C" }}
            onClick={handleLogin}
          >
            <MDBIcon className="mx-2" />
            Login with University Email
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
