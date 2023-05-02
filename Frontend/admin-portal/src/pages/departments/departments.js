import React, { useEffect, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import * as api from "../../api/department.api";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get_departments();
        const departmentData = response.data;
        setDepartment(departmentData);
        // setUser((prev) => [...prev, ...userData]);
      } catch (error) {
        console.log(  );
      }
    };
    fetchData();
  }, []);
  const handleEditClick = (id) => {
    let path = `/departmentdetails/${id}`;
    navigate(path);
  };
  const handleAddClick = () => {
    navigate('/adddepartment');
  };

  return (
    <div>
      <div className="mx-5">
        <br></br>
        <h2>Departments</h2>
      </div>
      <MDBRow>
      <MDBCol md="2">  <MDBBtn
          className="bg-dark mx-5 mt-3"
          rounded
          size="sm"
          onClick={() => handleAddClick()}
        >
          Add Department
        </MDBBtn>{" "}</MDBCol>        <MDBCol md="8">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody >
              {department.map((department, index) => (
                <tr key={index}>
                  <td scope="row">{department.id}</td>
                  <td>{department.name}</td>
                    <td>
                    {department.description}
                    </td>
                  <MDBBtn
                    className="bg-dark"
                    rounded
                    size="sm"
                    onClick={() => handleEditClick(department.id)}
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

export default Departments;
