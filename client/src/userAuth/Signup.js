import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUser} from './userSlice.js'
import {Link, useNavigate} from 'react-router-dom'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

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

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const displayErrors = errors?.map(error => <p style={{color: "red"}}>{error}</p>)
    console.log(errors)

    const handleSubmit = (e) => {
        e.preventDefault();
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            />
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              label="First Name"
              id="firstName"
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              label="Phone Number"
              id="phoneNumber"
            />
            {errors ? displayErrors: null }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup">
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Signup;