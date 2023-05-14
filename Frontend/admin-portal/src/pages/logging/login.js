import React, { useState } from "react";
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
import * as api from "../../api/user.api";
import { Modal } from "antd";
import { storeTokenInLocalStorage } from "../../api/auth";
import { useUser } from "../../utils/customHooks";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { user, authenticated } = useUser();

  const navigate = useNavigate();
  // const { instance } = useMsal();
  const error = () => {
    Modal.error({
      title: "Error while logging you in",
      content: "Email or password is incorrect or Not admin",
    });
  };
  // const handleFacultyLogin = () => {
  //   instance
  //     .loginPopup(loginRequest)
  //     .then((data) => {
  //       const username = data.account?.username;
  //       const name = data.account?.name;
  //       console.log("HELLO");
  //       console.log(data.account);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       error();
  //       console.log(error);
  //     });
  // };
  const setEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const setPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (email, password) => {
    try {
      const response = await api.get_user_login({
        email: email,
        password: password,
      });
      if (response.status === 200) {
        // login was successful, navigate to the next page
        storeTokenInLocalStorage(response.data.token);
        navigate("/");
      } else {
        // display an error message to the user
        error();
        console.log(response);
      }
    } catch (error) {
      // display a general error message to the user
      console.log("An error occurred during login:", error);
    }
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
            onChange={(e) => setEmailChange(e)}
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="2"
            label="Password"
            onChange={(e) => setPasswordChange(e)}
          />
          <MDBBtn
            size="md"
            className="mb-4 w-100"
            style={{ backgroundColor: "#0E538C" }}
            onClick={() => handleLogin(email, password)}
          >
            <MDBIcon className="mx-2" />
            Login
          </MDBBtn>

          {/* <MDBBtn
            className="mb-4 w-100"
            size="sm"
            style={{ backgroundColor: "#BDCDD6", color: "black" }}
            onClick={handleFacultyLogin}
          >
            <MDBIcon className="mx-2" />
            Login with University Email
          </MDBBtn> */}
          <div className="text-center">
            Forget password? <Link to={"/register"}>Reset</Link>
          </div>
          
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
