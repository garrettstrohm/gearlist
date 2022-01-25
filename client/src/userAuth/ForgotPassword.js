import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react"
import forgotPassword from '../assets/forgot-password-bg.jpeg'


const backgroundImageStyle = {
  backgroundImage: `url(${forgotPassword})`,
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
              <Typography component="h1" variant="h5" sx={{color: "#5D6D7E"}}>
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
                  sx={{backgroundColor: 'white', borderRadius: '5px', opacity: 0.8}}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#ABEBC6", color: "#5D6D7E" }}
                >
                  Reset Password
                </Button>
                </Box>
                <Grid container>
                  <Grid item>
                  <Link to="/login" style={linkStyle}>
                    Already Have An Account? Login
                    </Link>
                    <Grid item>
                    <Link to="/signup" style={linkStyle}>
                      Sign Up Here
                    </Link>
                    </Grid>
                  </Grid>
                </Grid>
            </Box>
          </Container>
          </Box>
      );
    }

export default ForgotPassword
