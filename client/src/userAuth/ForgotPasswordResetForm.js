import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUser} from './userSlice.js'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react"
import pwdReset from '../assets/password-reset-bg.jpeg'

const backgroundImageStyle = {
  backgroundImage: `url(${pwdReset})`,
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
}

function ForgotPasswordResetForm() {
    const [form, setForm] = useState({
        email: "",
        recoveryPassword: "",
        password: "",
        passwordConfirmation: ""
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.password !== form.passwordConfirmation){
            alert("Passwords don't match");
            setForm({
                ...form,
                password: "",
                passwordConfirmation: ""
            })
        } else {
        const formObj = {
            email: form.email,
            recovery_password: form.recoveryPassword,
            password: form.password,
            password_confirmation: form.passwordConfirmation
        }
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        }
        fetch('/reset_password', configObj)
        .then(r => r.json())
        .then(user => {
            if(user.error) {
                alert(user.error)
                navigate('/login')
            } else {
                fetch('/me')
                .then(r => {
                    if(r.ok){
                        r.json().then(user => {
                            alert('Password reset successfully!')
                            dispatch(setCurrentUser(user))
                            navigate('/')
                        })
                    }
                })
            }
        })
        };
    }

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
              <Typography component="h1" variant="h5" sx={{color: '#fff', textShadow: '1px 1px #000'}}>
                Password Reset
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  autoFocus
                  sx={{backgroundColor: 'white', borderRadius: '5px', opacity: 0.9}}
                />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="recoveryPassword"
                  label="Recovery Password"
                  name="recoveryPassword"
                  value={form.recoveryPassword}
                  onChange={handleChange}
                  autoFocus
                  sx={{backgroundColor: 'white', borderRadius: '5px', opacity: 0.9}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  autoFocus
                  sx={{backgroundColor: 'white', borderRadius: '5px', opacity: 0.9}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="passwordConfirmation"
                  type="password"
                  label="Confirm Your Password"
                  name="passwordConfirmation"
                  value={form.passwordConfirmation}
                  onChange={handleChange}
                  autoFocus
                  sx={{backgroundColor: 'white', borderRadius: '5px', opacity: 0.9}}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#ABEBC6", color: "#5D6D7E" }}
                >
                  Reset Password
                </Button>
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" style={linkStyle}>
                      "Don't have an account? Sign Up"
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      );
    }

export default ForgotPasswordResetForm;