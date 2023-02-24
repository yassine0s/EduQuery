import React, { useState } from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/user.api";
import { Button, Form, Input } from "antd";
import { Modal } from "antd";

const Register = () => {
    const error = () => {
        Modal.error({
          title: "Error while registering",
          content: "User already exists",
        });
      };
  const navigate = useNavigate();
    const handleRegister = async (values) => {
      try {
        const response = await register({
            username: values.username,
            type: 'student',
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
        });
        if (response.status === 201) {
          // login was successful, navigate to the next page
        //   navigate('/login');
        } else {
          // display an error message to the user
          error();
          console.log(response);
        }
      } catch (error) {
        // display a general error message to the user
        console.log("An error occurred during registration:", error);
      }
    };
  const onFinish = (values) => {
    handleRegister(values)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img src="./login.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col="4" md="4" className="mt-auto mb-auto">
            <h5 className="text-center mb-5">Register</h5>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                },
              ]}
            >
              <Input  />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please enter your first Name!",
                },
              ]}
            >
              <Input  />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please enter your last Name!",
                },
              ]}
            >
              <Input  />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email address',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input.Password  />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="default" htmlType="submit">
                Register
              </Button>
              <Button style={{marginLeft:10}} type="default" >
                <Link to='/login'>Back</Link>
              </Button>
            </Form.Item>
          </Form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
