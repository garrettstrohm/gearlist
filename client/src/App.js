import { useEffect } from "react";
import HomePage from "./main/HomePage.js"
import Login from "./userAuth/Login";
import Signup from "./userAuth/Signup.js";
import {Route, Routes, useNavigate} from "react-router-dom"
import ForgotPassword from "./userAuth/ForgotPassword";
import ForgotPasswordResetForm from "./userAuth/ForgotPasswordResetForm";
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUser} from './userAuth/userSlice.js'

function App() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok){
        r.json().then((user) => {
          dispatch(setCurrentUser(user))
        })
      } else{
        navigate("/login")
      }
    })
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="password/reset/edit" element={<ForgotPasswordResetForm />}/>
        <Route exact path="/" element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;