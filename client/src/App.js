import { useState, useEffect } from "react";
import Login from "./userAuth/Login";
import {Route, Routes, useNavigate} from "react-router-dom"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;