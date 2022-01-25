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
import signin from '../assets/sign-in-bg.jpeg'
import backpack from '../assets/backpack-logo.png'


const backgroundImageStyle = {
  backgroundImage: `url(${signin})`,
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

function Copyright(props) {
  return (
    <Typography variant="body2" color="#fff" align="center" {...props}>
      {'Copyright © '}
      <Link to="/" style={{'textDecoration': 'none', 'color': "#ABEBC6"}}>
        mygearlist.herokuapp.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login() {
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const displayErrors = errors?.map(error => <p style={{color: 'red'}}>{error}</p>)
    console.log(user)

const handleSubmit = (e) => {
    e.preventDefault();
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    }
    fetch('/login', configObj)
    .then(r => {
        if (r.ok){
            r.json().then(data => {
              dispatch(setCurrentUser(data))
              navigate("/")
            })
        } else {
          r.json().then(data => {
            setErrors(data.errors)
            console.log(data.errors)
          })
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
          <Avatar sx={{ m: 1 }}>
            <img src={backpack} style={{'maxWidth': '100%'}}/>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{color: '#fff'}}>
            Welcome To GearList
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
              sx={{backgroundColor: 'white', borderRadius: '5px', opacity: 0.8}}
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
              sx={{backgroundColor: 'white', borderRadius: '5px', opacity: 0.8}}
            />
            {errors ? displayErrors : null }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#ABEBC6", color: "#5D6D7E" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword" style={linkStyle}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" style={linkStyle}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </Box>
  );
}

export default Login;