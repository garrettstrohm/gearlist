import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { setCurrentUser } from './userSlice';
import profileBg from '../assets/profile-bg.jpeg'

const textStyle={
    mt: '10px'
}

const backgroundImageStyle = {
    backgroundImage: `url(${profileBg})`,
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

function ProfilePage() {
    const user = useSelector(state => state.user.user)
    const userParams = useParams()
    const [form, setForm] = useState({
        email: '',
        oldPassword: '',
        password: '',
        passwordConfirmation: ''
    })
    const [togglePasswordForm, setTogglePasswordForm] = useState(false)
    const [toggleEmailForm, setToggleEmailForm] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
     }
     console.log('form:', form)
     function handleSubmit(e){
         e.preventDefault();
         const updatePassword ={
             old_password: form.oldPassword,
             password: form.password,
             password_confirmation: form.passwordConfirmation
         }
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePassword)
        }
        fetch(`/password/${userParams.id}`, configObj)
        .then(r => {
            if(r.ok){
                r.json().then(data => {
                    dispatch(setCurrentUser(data))
                    alert('Password has been reset!')
                    setForm({
                        email: '',
                        oldPassword: '',
                        password: '',
                        passwordConfirmation: ''
                    })
                    navigate('/')
                })
            } else {
                r.json().then(error => alert(error.error))
            }
        })
     }

     function handleEmailSubmit(e){
         e.preventDefault();
         const updateEmail = {
             email: form.email
         }
         const configObj = { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateEmail)
         }
         fetch(`/users/${userParams.id}`, configObj)
         .then(r => {
             if(r.ok){
                 r.json().then(data => {
                     alert('Email has been successfully changed.')
                     dispatch(setCurrentUser(data))
                     setForm({
                        email: '',
                        oldPassword: '',
                        password: '',
                        passwordConfirmation: ''
                    })
                    navigate('/')
                 })
             } else {
                 alert('Something went wrong. Please enter a valid email address and try again.')
             }
         })
     }

     if (user === null){
         return null
     } else {
  return (
        <Box style={backgroundImageStyle}>
            <Container component="main" maxWidth='xs'>
                <Box 
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    backgroundColor: '#e6e6e6',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '1px 1px 2px 1px #bababa',
                    opacity: 0.8
                }}>
                    <Typography component="h1" variant="h5" sx={{color: '#000', textAlign: 'center'}}>
                        My Profile
                    </Typography>
                    <Box component='div' sx={{mt: 3, backgroundColor: 'yellow'}}></Box>
                    <Typography component='h2' variant='h5'>
                        Username: {user.username}
                    </Typography>
                    <Typography component='h2' variant='h5' sx={textStyle}>
                        Name: {user.first_name} {user.last_name}
                    </Typography>
                    <Typography component='h2' variant='h5' sx={textStyle}>
                        Email: {user.email}
                    </Typography>
                    <Typography component='h2' variant='h5' sx={textStyle}>
                        Phone Number: {user.phone_number}
                    </Typography>
                </Box>
                <Button onClick={() => setTogglePasswordForm(toggleForm => !toggleForm)} variant='contained' size='small' sx={{marginRight: '93px', marginTop: '10px',backgroundColor: "#ABEBC6", color: "#5D6D7E"}}>Change Password</Button>
                <Button onClick={() => setToggleEmailForm(toggleEmailForm => !toggleEmailForm)} variant='contained' size='small' sx={{marginTop: '10px', backgroundColor: "#ABEBC6", color: "#5D6D7E"}}>Update my Email</Button>
                {togglePasswordForm ? <Box component='form' onChange={handleChange} onSubmit={handleSubmit}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="oldPassword"
                label="Enter your Old Password"
                name="oldPassword"
                type='password'
                value={form.oldPassword}
                autoFocus
                style={inputStyle}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Enter your New Password"
                name="password"
                type='password'
                value={form.password}
                autoFocus
                style={inputStyle}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                type='password'
                id="passwordConfirmation"
                label="Confirm your New Password"
                name="passwordConfirmation"
                value={form.passwordConfirmation}
                autoFocus
                style={inputStyle}
                />
                <Button type='submit' size='small' sx={{backgroundColor: "#ABEBC6", color: "#5D6D7E"}}>Submit Password Changes</Button>
                </Box> : null}
                {toggleEmailForm ? <Box component='form' onChange={handleChange} onSubmit={handleEmailSubmit}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your New Email"
                name="email"
                value={form.email}
                style={inputStyle}
                autoFocus
                />
                <Button type='submit' size='small' sx={{backgroundColor: "#ABEBC6", color: "#5D6D7E"}}>Change My Email</Button>
                </Box> : null}
            </Container>
        </Box>
    );
    }
}

export default ProfilePage;
