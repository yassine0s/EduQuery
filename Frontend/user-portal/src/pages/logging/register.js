import React from "react";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
                // login_create_api({email: username, name}).then(data => console.log(data));
                navigate("/");
            }  
    return (
        <MDBContainer fluid className="p-3 my-5">
            <MDBRow>
                <MDBCol col="10" md="6">
                    <img
                        src="./login.svg"
                        className="img-fluid"
                        alt="Phone image"
                    />
                </MDBCol>

                <MDBCol col="4" md="4" className="mt-auto mb-auto">
                    <p className="text-center">Register</p>
                    <MDBInput className='mb-4' id='form8Example2' label='Username' />
                    <MDBInput className='mb-4' id='form8Example1' label='First Name' />
                    <MDBInput className='mb-4' id='form8Example1' label='Last Name' />
                    <MDBInput className='mb-4' type='email' id='form8Example3' label='Email address' />
                    <MDBInput className='mb-4' type='password' id='form8Example4' label='Password' />
                    <MDBInput className='mb-4' type='password' id='form8Example5' label='Repeat password' />
                    <MDBBtn
                        size="md"
                        className="mb-4 w-100"
                        style={{ backgroundColor: "#0E538C" }}
                        onClick={handleRegister}
                    >
                        <MDBIcon className="mx-2" />
                        Register
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Register;
