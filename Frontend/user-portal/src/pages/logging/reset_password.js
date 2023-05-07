import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../api/user.api";
import { Modal, Input } from "antd";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const handleReset = async () => {
    //    event.preventDefault();
    if (password !== confirmPassword) {
      error();
    } else {
      let success = false;
      try {
        const response = await api.changepass(password, token);
        if (response.status === 200) {
          success = true;
        }
        success();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const navigate = useNavigate();
  const error = () => {
    Modal.error({
      title: "Password does not match",
      content: "Please enter the same password",
    });
  };
  const success = () => {
    Modal.success({
      title: "Email sent containing the password",
      content: "Email sent containing the password",
    });
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow className=" mt-5">
        <MDBCol col="4" md="4"></MDBCol>

        <MDBCol col="44" md="4" className="mt-auto mb-auto">
          <p className="text-center">Reset</p>

          <MDBInput
            className="mb-4"
            type="password"
            id="1"
            label="New Password"
            onChange={(e) => handlePasswordChange(e)}
          />
          <MDBInput
            className="mb-4"
            type="password"
            id="2"
            label="Confirm Password"
            onChange={(e) => handleConfirmPasswordChange(e)}
          />
          <MDBBtn
            size="md"
            className="mb-4 w-100"
            style={{ backgroundColor: "#0E538C" }}
            onClick={() => handleReset(password)}
          >
            <MDBIcon className="mx-2" />
            Reset Password
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ResetPassword;
