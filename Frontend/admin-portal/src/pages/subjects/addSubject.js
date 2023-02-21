import React, { useState, useEffect } from "react";
import * as api from "../../api/subjects.api";
import { get_departments } from "../../api/department.api";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { Modal } from "antd";

import {
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";
import { openNotification } from "../../utils/functions";
export default function AddSubject() {
  const [department, setDepartment] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_departments();
        const departmenttData = response.data;
        setDepartment(departmenttData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [name, setName] = useState("");
  const [departmentid, setDepartmentid] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDidChange = (e) => {
    setDepartmentid(e.value);
  };
  const handleSubmit = async () => {
    let success = false;
    try {
      const response = await api.add_subject({
        name: name,
        departmentid: departmentid,
      });
      if (response.status === 201) {
        success = true;
        navigate("/subjects");
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
      <h5 className="mb-5">New Subject</h5>
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
            <MDBInputGroup id="2" textBefore="Department  " className="mb-3">
              <Select
                labelInValue
                defaultValue={{
                  value: "lucy",
                  label: "choose a department",
                }}
                style={{
                  width: 567,
                }}
                onChange={(e) => {
                  handleDidChange(e);
                }}
                options={department.map((dept) => ({
                  value: dept.id,
                  label: `${dept.name}`,
                }))}
              />
            </MDBInputGroup>{" "}
          </MDBCol>
        </MDBRow>
        <br></br>
        <MDBBtn className="mt-3" color="dark" onClick={showModal}>
          Create Subject
        </MDBBtn>
        <br></br>
      </MDBContainer>
      <Modal
            okType='default'

        title="Add Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to do this action</p>
      </Modal>
    </div>
  );
}
