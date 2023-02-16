import React, { useEffect, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import * as api from "../../api/subjects.api";
import { useNavigate } from "react-router-dom";

const Subjects = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get_subjects();
        console.log(response.data[0]);
        const subjectData = response.data;
        setSubject(subjectData);
        // setUser((prev) => [...prev, ...userData]);
      } catch (error) {
        console.log();
      }
    };
    fetchData();
  }, []);
  const handleEditClick = (id) => {
    let path = `/subjectdetails/${id}`;
    navigate(path);
  };

  return (
    <div>
      <div className="mx-5">
        <br></br>
        <h2>Subjects</h2>
      </div>
      <MDBRow>
        <MDBCol md="2"></MDBCol>
        <MDBCol md="8">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Department ID</th>
                <th scope="col">Name</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {subject.map((subject, index) => (
                <tr key={index}>
                  <td scope="row">{subject.id}</td>
                  <td>{subject.departmentid}</td>
                  <td>{subject.name}</td>
                  <MDBBtn
                    className="bg-dark"
                    rounded
                    size="sm"
                    onClick={() => handleEditClick(subject.id)}
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
};

export default Subjects;
