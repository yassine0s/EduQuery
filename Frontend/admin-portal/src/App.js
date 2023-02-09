import "./App.css";
import Mainpage from "./pages/mainpage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Departments from "./pages/departments";
import Layout from "./layout";
import Teachers from "./pages/users";
import Subjects from "./pages/subjects";
import DepartmentDetails from "./pages/departmentDetails";
import Login from "./pages/login";
import SubjectDetails from "./pages/subjectDetails";
import UserDetails from "./pages/userDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />{" "}
      <Route  path="/" element={<Layout />}>
        <Route path="/home" element={<Mainpage />} />
        <Route path="/departments" element={<Departments />} />{" "}
        <Route path="/users" element={<Teachers />} />{" "}
        <Route path="/subjects" element={<Subjects />} />{" "}
        <Route path="/departmentdetails" element={<DepartmentDetails />} />{" "}
        <Route path="/subjectdetails" element={<SubjectDetails />} />{" "}
        <Route path="/userdetails" element={<UserDetails />} />{" "}

      </Route>
    </Routes>
  );
}

export default App;
