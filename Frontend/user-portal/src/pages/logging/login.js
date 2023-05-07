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
import { useUser } from "../../utils/customHooks";
import * as api from "../../api/user.api";
import { Modal, Input } from "antd";
import { storeTokenInLocalStorage } from "../../api/auth";
import { UserOutlined } from '@ant-design/icons';
const Login = () => {
  const [email, setEmail] = useState("");
  const [resetemail, setRestEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { user, authenticated } = useUser();
  const handleReset = () => {
    console.log(resetemail);
    api.reset(resetemail)
    console.log(resetemail)
    success();
  };
  const navigate = useNavigate();
  // const { instance } = useMsal();
  const error = () => {
    Modal.error({
      title: "Login Error",
      content: "Email or password is incorrect",
    });
  };
  const success = () => {
    Modal.success({
      title: "Email sent containing the password",
      content: "Email sent containing the password",
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleReset()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
          <div className="text-center">
            Forgot password? <Link onClick={showModal}>Reset</Link>
          </div>
          <p className="text-center"></p>

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
            Not a member? <Link to={"/register"}>Register</Link>
          </div>
        </MDBCol>
      </MDBRow>
      <Modal
        okType="default"
        title="Reset password"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <Input
          onChange={(e) => setRestEmail(e.target.value)}
          size="large"
          placeholder="Enter your email Address"
          prefix={<UserOutlined />}
        />
      </Modal>
    </MDBContainer>
  );
};

export default Login;
