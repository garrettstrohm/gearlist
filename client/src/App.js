import { useState, useEffect } from "react";
import Login from "./userAuth/Login";
import {Route, Routes, useNavigate} from "react-router-dom"
import ForgotPassword from "./userAuth/ForgotPassword";
import ForgotPasswordResetForm from "./userAuth/ForgotPasswordResetForm";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="password/reset/edit" element={<ForgotPasswordResetForm />}/>
      </Routes>
    </div>
  );
}

export default App;