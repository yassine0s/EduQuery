import React from "react";
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Card } from "antd";

const departments = () => {
  return (
    <div className="mx-5">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="5">
            <h4 className="m-5"> Departmetns</h4>
            <MDBListGroup
              style={{
                minWidth: "22rem",
                marginLeft: "80px",
                marginTop: "40px",
                overflow: "auto",
                maxHeight: "400px",
              }}
              light
            >
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                noBorders
                color="light"
                className="px-3 rounded-3 mb-2"
              >
                A simple light list group item
              </MDBListGroupItem>
            </MDBListGroup>{" "}
          </MDBCol>
          <MDBCol md="6">
            <div
              style={{
                minWidth: "22rem",
                marginLeft: "100px",
                marginTop: "60px",
                overflow: "auto",
                maxHeight: "500px",
              }}
            >
              <Card title="Details">
                <Card
                  type="inner"
                  title="Description"
                  style={{ maxHeight: 200, overflow: "auto" }}
                >
                  ultricies nec, pellentesque eu, peu, pretiueu, pretiueu,
                  pretiueu, pretiueu, pretiueeu, pretiueu, pretiueu, pretiueu,
                  pretiueu, pretiuu, pretiueu, pretiueu, pretiuretiu
                </Card>
                <Card
                  style={{
                    marginTop: 16,
                    maxHeight: 200,
                    overflow: "auto",
                  }}
                  type="inner"
                  title="Subjects"
                >
                  <MDBListGroup light numbered style={{ minWidth: "22rem" }}>
                    <MDBListGroupItem>Subject 1</MDBListGroupItem>
                    <MDBListGroupItem>Subject 2</MDBListGroupItem>
                    
                  </MDBListGroup>{" "}
                </Card>
              </Card>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default departments;
