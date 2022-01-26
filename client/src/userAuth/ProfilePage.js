import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { setCurrentUser } from './userSlice';

const textStyle={
    mt: '10px'
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
    const [toggleForm, setToggleForm] = useState(false)
    const dispatch = useDispatch()

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
                })
            } else {
                r.json().then(error => alert(error.error))
            }
        })
     }
     if (user === null){
         return null
     } else {
  return (
        <Box>
            <Container component="main" maxWidth='xs'>
                <Box 
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    backgroundColor: 'yellow'
                }}>
                    <Typography component="h1" variant="h5" sx={{color: '#000', textAlign: 'center'}}>
                        My Profile
                    </Typography>
                    <Box component='div' sx={{mt: 5, backgroundColor: 'yellow'}}></Box>
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
                <Button onClick={() => setToggleForm(toggleForm => !toggleForm)}>Change my Password</Button>
                <Button>Update my Email</Button>
                {toggleForm ? <Box component='form' onChange={handleChange} onSubmit={handleSubmit}>
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
                />
                <Button type='submit'>Submit Password Changes</Button>
                </Box> : null}
            </Container>
        </Box>
    );
    }
}

export default ProfilePage;
