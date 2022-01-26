import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import {useState} from "react"
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import createTripBg from '../assets/create-trip-bg.jpeg'


const backgroundImageStyle = {
  backgroundImage: `url(${createTripBg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundOpacity: 0.6,
  height: '100vh',
  overflow: 'hidden'
}
const inputStyle ={
  backgroundColor: 'white', 
  borderRadius: '5px', 
  opacity: 0.8
}

export default function CreateTripForm() {
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        title: "",
        image: "",
        startDate: "",
        endDate: "",
        location: "",
        description: ""
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
    console.log(form)
    function handleSubmit(e){
        e.preventDefault()
        const newTrip = {
            title: form.title,
            image: form.image,
            date: `${form.startDate} - ${form.endDate}`,
            location: form.location,
            description: form.description
        }
        console.log(newTrip)
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTrip)
        }
        fetch('/trips', configObj)
        .then(r => {
          if(r.ok){
            r.json().then(data => {
              console.log(data)
              navigate(`/mytrip/${data.id}`)
          })
          } else {
            r.json().then(errors => setErrors(errors.errors))
          }
        })
    }

    const displayErrors = errors?.map(error => <p style={{color: 'red', textShadow: '1px 1px #000'}}>{error}</p>)

  return (
    <Box style={backgroundImageStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{color: '#fff', textShadow: "1px 1px #000"}}>
            Organize Your Trip here!
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
              style={inputStyle}
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
              style={inputStyle}
            />
            <Stack direction='row'>
            <TextField
              margin="normal"
              required
              fullWidth
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              helperText="Start Date"
              sx={{marginRight: '5px'}}
              id="outlined-helperText"
              style={inputStyle}
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
              sx={{marginLeft: '5px'}}
              style={inputStyle}
            />
            </Stack>
            <TextField
              margin="normal"
              required
              fullWidth
              name="location"
              value={form.location}
              onChange={handleChange}
              label="Location"
              id="location"
              style={inputStyle}
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
              style={inputStyle}
            />
                {errors ? displayErrors: null }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#ABEBC6", color: "#5D6D7E" }}
            >
              Create My Trip
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
