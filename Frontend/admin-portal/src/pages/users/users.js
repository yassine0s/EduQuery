import React, { useEffect, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import * as api from "../../api/user.api";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get_users();
        console.log(response.data[0]);
        const userData = response.data;
        setUser(userData);
        // setUser((prev) => [...prev, ...userData]);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleEditClick = (id, username, firstname, lastname, email, type) => {
    let path = `/userdetails/${id}`;
    navigate(path);
  };
  return (
    <div>
      <div className="mx-5">
        <br></br>
        <MDBRow>
          <MDBCol md="2">
            {" "}
            <h2>Users</h2>
          </MDBCol>
          <MDBCol md="8">
            {" "}
            <MDBBtn className="bg-dark mb-4 mt-2" rounded size="sm">
              Add user
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </div>
      <MDBRow className="mx-2">
        <MDBCol md="2"></MDBCol>
        <MDBCol md="8">
          <MDBTable>
            <MDBTableHead dark>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">username</th>
                <th scope="col">firstname</th>
                <th scope="col">lastname</th>
                <th scope="col">email</th>
                <th scope="col">type</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {user.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{user.id}</th>
                  <th scope="col">{user.username}</th>
                  <th scope="col">{user.firstname}</th>
                  <th scope="col">{user.lastname}</th>
                  <th scope="col">{user.email}</th>
                  <th scope="col">{user.type}</th>

                  <MDBBtn
                    className="bg-dark"
                    rounded
                    size="sm"
                    onClick={() =>
                      handleEditClick(
                        user.id,
                        user.username,
                        user.firstname,
                        user.lastname,
                        user.email,
                        user.type
                      )
                    }
                  >
                    Edit
                  </MDBBtn>
                </tr>
                // <div
                //   className="border select-none  rounded-md hover:bg-slate-200"
                //   onClick={() =>
                //     handleTeacherClick(
                //       teacher.TeacherID,
                //       teacher.TeacherName,
                //       teacher.TeacherBio,
                //       teacher.TeacherEmail,
                //       teacher.TeacherPict
                //     )
                //   }
                // >
                //   {teacher.TeacherName}
                // </div>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
        <MDBCol md="2"></MDBCol>
      </MDBRow>
    </div>
  );
};

export default Users;
