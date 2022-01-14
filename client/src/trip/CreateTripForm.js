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

export default function CreateTripForm() {
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        title: "",
        image: "",
        startDate: "",
        endDate: "",
        location: ""

    })

    console.log(form)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const newTrip = {
            title: form.title,
            image: form.image,
            date: `${form.startDate} - ${form.endDate}`,
            location: form.location
        }
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTrip)
        }
        fetch('/trips', configObj)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            navigate(`/mytrip/${data.id}`)
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
          <Typography component="h1" variant="h4">
            Organize Your Trip here!
          </Typography>
          <Typography component="h1" variant="h6">
            Once you have created your trip, you can add required items and other adventurers on the trip's page!
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onChange={handleChange} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Name Your Trip!"
              name="title"
              value={form.title}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              value={form.image}
              onChange={handleChange}
              label="Post A Trip Pic!"
              id="image"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              helperText="Start Date"
              id="outlined-helperText"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              helperText="End Date"
              id="outlined-helperText"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="location"
              value={form.location}
              onChange={handleChange}
              label="Location"
              id="location"
            />
            <TextField
              margin="normal"
              multiline
              maxRows={Infinity}
              required
              fullWidth
              name="description"
              value={form.description}
              onChange={handleChange}
              label="Description"
              type="textarea"
              id="description"
            />
                {/* {errors ? displayErrors: null } */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create My Trip
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
