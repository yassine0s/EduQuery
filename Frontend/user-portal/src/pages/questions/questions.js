import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const questions = () => {
  return (
    <div style={{ width: "100%", margin: "20px" ,maxHeight:'100vh',overflow:'auto'}}>
      <h5 className="m-2">List of questions</h5>
      <div >
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Question</th>
              <th scope="col">User</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Flags</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>
                <p style={{}} className="fw-normal mb-1 ">
                  <Link to="/openquestion">
                    <div style={{ color: "black", overflow: "hidden" }}>
                      Question number 1
                    </div>
                  </Link>
                </p>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">John Doe</p>
                    <p className="text-muted mb-0">john.doe@gmail.com</p>
                  </div>
                </div>
              </td>
              <td>
                <MDBBadge color="success" pill>
                  C++
                </MDBBadge>
              </td>
              <td>11/05/2022</td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
};

export default questions;
