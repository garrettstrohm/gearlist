import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import signupBg from '../assets/signup-bg.jpeg'
import {useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUser} from './userSlice.js'
import {Link, useNavigate} from 'react-router-dom'
import Stack from '@mui/material/Stack';
import backpack from '../assets/backpack-logo.png'


const backgroundImageStyle = {
  backgroundImage: `url(${signupBg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundOpacity: 0.6,
  height: '100vh',
  overflow: 'hidden'
}
const linkStyle = {
  textDecoration: 'none', 
  color: "#fff",
  textShadow: '2px 2px #000',
  textOutline: '2px #000'
}

const inputStyleLeft ={
  backgroundColor: 'white', 
  borderRadius: '5px', 
  opacity: 0.8,
  marginRight: '10px'
}
const inputStyleRight ={
  backgroundColor: 'white', 
  borderRadius: '5px', 
  opacity: 0.8,
  marginLeft: '10px'
}

function Signup() {
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        username: "",
        password: "",
        passwordConfirmation: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",

    })

    console.log('signup form:', form)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const displayErrors = errors?.map(error => <p style={{color: "red"}}>{error}</p>)
    console.log(errors)

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
          username: form.username,
          password: form.password,
          password_confirmation: form.passwordConfirmation,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone_number: form.phoneNumber
        }
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }
        fetch('/signup', configObj)
        .then(r => {
            if (r.ok){
                r.json().then(data => {
                dispatch(setCurrentUser(data))
                console.log(user)
                navigate("/")
                })
            } else {
                r.json().then(data => setErrors(data.errors))
            }
        })
    };

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

  return (
    <Box style={backgroundImageStyle}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <img src={backpack} style={{'maxWidth': '100%'}}/>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{color: '#fff'}}>
            Sign Up For GearList!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stack direction='row'>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              autoFocus
              style={inputStyleLeft}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              value={form.email}
              onChange={handleChange}
              label="Email"
              id="email"
              style={inputStyleRight}
            />
            </Stack>
            <Stack direction='row'>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={form.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              style={inputStyleLeft}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              value={form.passwordConfirmation}
              onChange={handleChange}
              label="Confirm Your Password"
              type="password"
              id="passwordConfirmation"
              style={inputStyleRight}
            />
            </Stack>
            <Stack direction='row'>
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              label="First Name"
              id="firstName"
              style={inputStyleLeft}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              label="Last Name"
              id="lastName"
              style={inputStyleRight}
            />
            </Stack>
            <TextField
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              label="Phone Number"
              id="phoneNumber"
              style={inputStyleLeft}
            />
            <Box sx={{backgroundColor: '#fff', opacity: 0.8, borderRadius: '5px'}}>
              {errors ? displayErrors : null }
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#ABEBC6", color: "#5D6D7E" }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword" style={linkStyle}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login" style={linkStyle}>
                  Already Have An Account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Box>
  );
}

export default Signup;