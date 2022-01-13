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

import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react"
import LogoutButton from './LogoutButton';

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

function ForgotPassword() {
    const [form, setForm] = useState({
        email: ""
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }
        fetch('/forgot_password', configObj)
        .then(r => r.json())
        .then(data => {
            alert(data.alert)
            navigate('/login')
        })
        .catch(console.log)
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
              <Typography component="h1" variant="h5">
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
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
                </Box>
                <Grid container>
                  <Grid item xs>
                  </Grid>
                  <Grid item>
                      <LogoutButton />
                    <Link to="/signup">
                      "Don't have an account? Sign Up"
                    </Link>
                  </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      );
    }

export default ForgotPassword
