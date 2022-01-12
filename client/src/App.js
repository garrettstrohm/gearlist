import { useState, useEffect } from "react";
import Login from "./userAuth/Login";
import {Route, Routes, useNavigate} from "react-router-dom"
import ForgotPassword from "./userAuth/ForgotPassword";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
      </Routes>
    </div>
  );
}

export default App;