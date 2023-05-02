import React, { useState, useEffect } from "react";
import * as api from "../../api/user.api";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBContainer,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { Modal } from "antd";

import { openNotification } from "../../utils/functions";
const UserDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const showModalaForSumbit = () => {
    setIsModalOpen(true);
  };
  const showModalaForDelete = () => {
    setIsModalOpen1(true);
  };
  const handleOkSubmit = () => {
    setIsModalOpen(false);
    handleSubmit();
  };
  const handleOkDelete = () => {
    setIsModalOpen(false);
    handleDelete();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get_user(id);
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async () => {
    let success = false;
    try {
      const response = await api.modify_user(id, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        type: type,
      });
      if (response.status === 200) {
        success = true;
      }

      openNotification({
        message: "user update",
        description: response.data.message,
        duration: 2,
        type: success ? "success" : "error",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    let success = false;
    try {
      const response = await api.delete_user(id);

      if (response.status === 200) {
        success = true;
        navigate("/users");
      }
      openNotification({
        message: "subject delete",
        description: response.data.message,
        duration: 2,
        type: success ? "success" : "error",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <MDBContainer breakpoint="sm">
        <MDBRow className="g-5">
          <MDBCol>
            <MDBInputGroup id="1" textBefore="Username" className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder={user.username}
                onChange={(e) => {
                  handleUsernameChange(e);
                }}
              />
            </MDBInputGroup>
            <br></br>
            <MDBInputGroup id="2" textBefore="Type  " className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder={user.type}
                onChange={(e) => {
                  handleTypeChange(e);
                }}
              />
            </MDBInputGroup>{" "}
          </MDBCol>
          <MDBCol>
            <MDBInputGroup id="3" textBefore="First Name" className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder={user.firstname}
                onChange={(e) => {
                  handleFirstnameChange(e);
                }}
              />
            </MDBInputGroup>
            <br></br>
            <MDBInputGroup id="4" textBefore="Last Name" className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder={user.lastname}
                onChange={(e) => {
                  handleLastnameChange(e);
                }}
              />
            </MDBInputGroup>{" "}
          </MDBCol>
          <MDBCol>
            <h6>Email</h6>
            <MDBInputGroup id="5" textBefore="Email" className="mb-3">
              <input
                className="form-control"
                type="email"
                placeholder={user.email}
                onChange={(e) => {
                  handleEmailChange(e);
                }}
              />
            </MDBInputGroup>{" "}
            <br></br>
          </MDBCol>
        </MDBRow>
        <br></br>
        <MDBBtn className="mt-3" color="dark"           onClick={() => showModalaForSumbit()}
>
          Update user
        </MDBBtn>
        <br></br>

        <MDBBtn className="mt-3" color="dark"          onClick={() => showModalaForDelete()}
>
          Delete user
        </MDBBtn>
      </MDBContainer>
      <Modal
        okType="default"
        title="update"
        open={isModalOpen}
        onOk={handleOkSubmit}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to do this action</p>
      </Modal>
      <Modal
        okType="default"
        title="delete"
        open={isModalOpen1}
        onOk={handleOkDelete}
        onCancel={handleCancel1}
      >
        <p>Are you sure you want to do this action</p>
      </Modal>
    </div>
  );
};
export default UserDetails;
