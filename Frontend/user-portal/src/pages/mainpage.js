import React from 'react';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBContainer,
  } from "mdb-react-ui-kit";
  
const mainPage = () => {
    return (
        <div>
      <MDBContainer
        style={{ width: "90%", height: "90%", overflow: "auto" }}
        className="m-5 "
        breakpoint="sm"
      >
        <div>
          <MDBTable style={{ width: "135vh" }}>
            <MDBTableHead>
              <tr>
                <th className="" scope="col">
                  News
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody style={{ height: "20vh" }}>
              <tr className="table-secondary">
                <th scope="row">News1</th>
              </tr>
              <tr className="table-secondary">
                <th scope="row">News2</th>
              </tr>
              <tr className="table-secondary">
                <th scope="row">News3</th>
              </tr>
              <tr className="table-secondary">
                <th scope="row">News3</th>
              </tr>
              <tr className="table-secondary">
                <th scope="row">News3</th>
              </tr>
              <tr className="table-secondary">
                <th scope="row">News3</th>
              </tr>
              
            </MDBTableBody>
          </MDBTable>
        </div>
      </MDBContainer>
    </div>
    );
};

export default mainPage;