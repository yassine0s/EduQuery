import React, { useState, useEffect } from "react";
import * as api from "../../api/department.api";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

import {
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";
import { openNotification } from "../../utils/functions";
export default function Adddepartment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleSubmit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    let success = false;
    try {
      const response = await api.add_department({
        name: name,
        description: description,
      });
      if (response.status === 201) {
        success = true;
        navigate("/departments");
      }

      openNotification({
        message: "Create department",
        description: response.data.message,
        duration: 2,
        type: success ? "success" : "error",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ marginTop: "60px", marginLeft: 80, width: 700 }}>
      <h5 className="mb-5">New Department</h5>
      <MDBContainer breakpoint="sm">
        <MDBRow className="g-5">
          <MDBCol>
            <MDBInputGroup id="2" textBefore="Name  " className="mb-3">
              <input
                className="form-control"
                type="text"
                onChange={(e) => {
                  handleNameChange(e);
                }}
              />
            </MDBInputGroup>{" "}
            <MDBInputGroup id="2" textBefore="Description  " className="mb-3">
              <textarea
                className="form-control"
                style={{ height: 200 }}
                type="text"
                onChange={(e) => {
                  handleDescriptionChange(e);
                }}
              />
            </MDBInputGroup>{" "}
          </MDBCol>
        </MDBRow>
        <br></br>
        <MDBBtn className="mt-3" color="dark" onClick={showModal}>
          Create Department
        </MDBBtn>
        <br></br>
      </MDBContainer>
      <Modal
        okType="default"
        title="Add"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to do this action</p>
      </Modal>
    </div>
  );
}
