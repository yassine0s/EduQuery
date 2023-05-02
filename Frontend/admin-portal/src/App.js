import "./App.css";
import Mainpage from "./pages/mainpage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Departments from "./pages/departments/departments";
import Layout from "./layout";
import Users from "./pages/users/users";
import Subjects from "./pages/subjects/subjects";
import DepartmentDetails from "./pages/departments/departmentDetails";
import Login from "./pages/logging/login";
import SubjectDetails from "./pages/subjects/subjectDetails";
import UserDetails from "./pages/users/userDetails";
import Adddepartment from "./pages/departments/addDepartment";
import AddSubject from "./pages/subjects/addSubject";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />{" "}
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Mainpage />} />
        <Route path="/departments" element={<Departments />} />{" "}
        <Route path="/users" element={<Users />} />{" "}
        <Route path="/adddepartment" element={<Adddepartment />} />{" "}
        <Route path="/addsubject" element={<AddSubject />} />{" "}
        <Route path="/subjects" element={<Subjects />} />{" "}
        <Route path="/departmentdetails/:id" element={<DepartmentDetails />} />{" "}
        <Route path="/subjectdetails/:id" element={<SubjectDetails />} />{" "}
        <Route path="/userdetails/:id" element={<UserDetails />} />{" "}
      </Route>
    </Routes>
  );
}

export default App;
