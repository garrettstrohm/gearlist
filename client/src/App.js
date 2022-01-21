import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import HomePage from "./main/HomePage.js"
import Login from "./userAuth/Login";
import Signup from "./userAuth/Signup.js";
import {Route, Routes, useNavigate, useLocation} from "react-router-dom"
import ForgotPassword from "./userAuth/ForgotPassword";
import ForgotPasswordResetForm from "./userAuth/ForgotPasswordResetForm";
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUser} from './userAuth/userSlice.js'
import CreateTripForm from "./trip/CreateTripForm.js";
import TripPage from "./trip/TripPage.js";
import AdventurePage from './adventure/AdventurePage.js'

function App() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log("location:", location)

  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok){
        r.json().then((user) => {
          dispatch(setCurrentUser(user))
        })
      } else if (location.pathname === '/signup') {
        return null
      } else if (location.pathname !== '/password/reset/edit' && location.pathname !== '/forgotpassword'){
        // navigate("/login")
      }
    })
  }, [location.pathname])


  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="/password/reset/edit" element={<ForgotPasswordResetForm />}/>
        <Route path="/createtrip" element={<CreateTripForm />}/>
        <Route path="/mytrip/:id" element={<TripPage />}/>
        <Route path="/adventure/:id" element={<AdventurePage />}/>
        <Route exact path="/" element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;