import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";

const departments = () => {
  return (
    <div>
      <div className="mx-5">
        <br></br>
        <h2>Departments</h2>
      </div>
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
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <MDBBtn className="bg-dark"  rounded size="sm" href="/departmentDetails">
                  Edit
                </MDBBtn>{" "}
              </tr>
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
        <MDBCol md="2"></MDBCol>
      </MDBRow>
    </div>
  );
};

export default departments;
