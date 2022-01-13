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
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentUser} from './userSlice.js'

import {Link} from 'react-router-dom'
import {useState} from "react"

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

const theme = createTheme()

function ForgotPasswordResetForm() {
    const [form, setForm] = useState({
        token: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    console.log("user on forgot password", user)

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
            token: form.token,
            email: form.email,
            password: form.password,
            password_confirmation: form.passwordConfirmation
        }
        console.log(formObj)
        const configObj = {
            method: "PATCH",
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
            } else {
                fetch('/me')
                .then(r => {
                    if(r.ok){
                        r.json().then(user => {
                            dispatch(setCurrentUser(user))
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
              <Typography component="h1" variant="h5">
                Password Reset
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="token"
                  label="Token"
                  name="token"
                  value={form.token}
                  onChange={handleChange}
                  autoFocus
                />
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
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
                <Grid container>
                  <Grid item xs>
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

export default ForgotPasswordResetForm;