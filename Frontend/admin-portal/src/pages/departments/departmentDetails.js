import React, { useState, useEffect } from "react";
import * as api from "../../api/department.api";
import { get_dep_subjects } from "../../api/subjects.api";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBContainer,
  MDBTableHead,
  MDBTable,
  MDBTableBody,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { openNotification } from "../../utils/functions";

export default function DepartmentDetails() {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [subject, setSubject] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get_department(id);
        const departmentData = response.data;
        setDepartment(departmentData);
        //
        const SubjectResponse = await get_dep_subjects(id);
        const RelatedSubjects = SubjectResponse.data;
        setSubject(RelatedSubjects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
      const response = await api.modify_department(id, {
        name: name,
        description: description,
      });
      if (response.status === 200) {
        success = true;
      }

      openNotification({
        message: "department update",
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
      const response = await api.delete_department(id);
      if (response.status === 200) {
        success = true;
        navigate("/departments");
      }

      openNotification({
        message: "department delete",
        description: response.data.message,
        duration: 2,
        type: success ? "success" : "error",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubjectClick = async (id) => {
    let path = `/subjectdetails/${id}`;
    navigate(path);
  };
  return (
    <div>
      <div style={{ marginTop: "60px" }}>
        <MDBContainer breakpoint="sm">
          <MDBRow className="g-5">
            <MDBCol>
              <MDBInputGroup id="2" textBefore="Name  " className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder={department.name}
                  onChange={(e) => {
                    handleNameChange(e);
                  }}
                />
              </MDBInputGroup>{" "}
              <MDBInputGroup id="2" textBefore="description" className="mb-3">
                <textarea
                  className="form-control"
                  type="text"
                  style={{ height: "150px" }}
                  placeholder={department.description}
                  onChange={(e) => {
                    handleDescriptionChange(e);
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
            Update Department
          </MDBBtn>
          <br></br>

          <MDBBtn
            className="mt-3"
            color="dark"
            onClick={() => handleDelete(id)}
          >
            Delete Department
          </MDBBtn>
        </MDBContainer>
      </div>
      <h2 className="mx-5 mt-5"> Related Subjects</h2>
      <br></br>
      <MDBRow>
        <MDBCol md="2"></MDBCol>
        <MDBCol md="8">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {subject.map((subject, index) => (
                <tr key={index}>
                  <td scope="row">{subject.id}</td>
                  <td>{subject.name}</td>
                  <MDBBtn
                    className="bg-dark"
                    rounded
                    size="sm"
                    onClick={() => handleEditSubjectClick(subject.id)}
                  >
                    Edit
                  </MDBBtn>{" "}
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
        <MDBCol md="2"></MDBCol>
      </MDBRow>
    </div>
  );
}
