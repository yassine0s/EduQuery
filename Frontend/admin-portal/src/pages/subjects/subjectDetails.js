import React, { useState, useEffect } from "react";
import * as api from "../../api/subjects.api";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBBtn,
  MDBContainer,
} from 'mdb-react-ui-kit';
import { openNotification } from "../../utils/functions";
export default function SubjectDetails() {

  const { id } = useParams();
  const [subject, setSubject] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get_subject(id);
        const subjectData = response.data;
        setSubject(subjectData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async () => {
    let success = false;
    try {
      const response = await api.modify_subject(id, {
        name: name,
      });
      if (response.status === 200) {
        success = true;
      }

      openNotification({
        message: "Subject update",
        description: response.data.message,
        duration: 2,
        type: success ? "success" : "error",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    let success = false;
    try {
      const response = await api.delete_subject(id);
      if (response.status === 200) {
        success = true;
        navigate("/subjects");
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
            <MDBInputGroup id="2" textBefore="Name  " className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder={subject.name}
                onChange={(e) => {
                  handleNameChange(e);
                }}
              />
            </MDBInputGroup>{" "}
          </MDBCol>
        </MDBRow>
        <br></br>
        <MDBBtn
          className="mt-3"
          color="dark"
          onClick={() => handleSubmit(id)}
        >
          Update Subject
        </MDBBtn>
        <br></br>

        <MDBBtn
          className="mt-3"
          color="dark"
          onClick={() => handleDelete(id)}
        >
          Delete Subject
        </MDBBtn>
      </MDBContainer>
    </div>

  );
}