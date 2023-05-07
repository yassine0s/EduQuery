import './App.css';
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Layout from "./layout";
import Mainpage from "./pages/mainpage";
import Login from './pages/logging/login';
import Register from './pages/logging/register';
import Departments from './pages/departments';
import Questions from './pages/questions/questions';
import Askquestion from './pages/ask/askquestion';
import Openquestions from './pages/questions/openquestion';
import Reports from './pages/reports';
import ResetPassword from './pages/logging/reset_password';
function App() {
  return (
    <Routes>
    <Route path="/login" element={<Login />} />{" "}
    <Route path="/register" element={<Register />} />{" "}
    <Route path="/reset_password/:token" element={<ResetPassword />} />
    <Route  path="/" element={<Layout />}>
            <Route path="/departments" element={<Departments />} />{" "}  
            <Route path="/" element={<Mainpage />} />
            <Route path="/questions" element={<Questions />} />{" "}
            <Route path="/askquestion" element={<Askquestion />} />{" "}
            <Route path="/openquestion/:id" element={<Openquestions />} />
            <Route path="/reports" element={<Reports />} />
    </Route>
  </Routes>
  );
}

export default App;
