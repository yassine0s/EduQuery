import React, { useState, useEffect } from "react";

import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Card } from "antd";
import * as api from "../api/department.api";
import { get_dep_subjects } from "../api/subject.api";

const Departments = () => {
  const [department, setDepartment] = useState([]);
  const [description, setDescription] = useState("Department description");
  const [subject, setSubject] = useState([{name:'Subject Name'}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get_departments();
        const departmentData = response.data;
        setDepartment(departmentData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const fetchSubjects = async (did) => {
    try {
      const SubjectResponse = await get_dep_subjects(did);
      const RelatedSubjects = SubjectResponse.data;
      setSubject(RelatedSubjects);
    } catch (error) {
      console.log();
    }
  };
  const handleDepSelect = (did, descrip) => {
    setDescription(descrip);
    fetchSubjects(did);
  };
  return (
    <div className="mx-5">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="5">
            <h4 className="m-5"> Departments</h4>
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
              {department.map((department, index) => (
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  noBorders
                  color="light"
                  className="px-3 rounded-3 mb-2"
                  onClick={() => {
                    handleDepSelect(department.id, department.description);
                  }}
                >
                  {department.name}
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCol>
          <MDBCol md="6">
            <div
              style={{
                width: 500,
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
                  {description}
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
                    {subject.map((subject, index) => (
                      <MDBListGroupItem>{subject.name}</MDBListGroupItem>
                    ))}
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

export default Departments;
