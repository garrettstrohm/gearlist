import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import {selectTrip, setAllTrips} from './tripSlice'
import Stack from '@mui/material/Stack';
import  TextField  from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function UpdateTripImageForm() {
    const trip = useSelector(state => state.trips.selectedTrip)
    const trips = useSelector(state => state.trips.trips)
    const selectedTrip = useParams()
    const [form, setForm] = useState({
        image: ''
    })
    const dispatch = useDispatch()
    console.log(form)
    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const configObj ={
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
        fetch(`/trips/${selectedTrip.id}`, configObj)
        .then(r => r.json())
        .then(data => {
            const newTrips = trips.map(trip => {
                if(trip.id === data.id){
                    return data
                } else {
                    return trip
                }
            })
            dispatch(setAllTrips(newTrips))
            setForm({
                image: ''
            })
        })
    }
    
  return (
        <div>
            <Box component='form' onChange={handleChange} onSubmit={e => handleSubmit(e)}>
                <Stack direction='row' spacing={2} marginBottom='5px'>
                    <TextField size='small' variant='standard' name='image' value={form.image} label='Image Address'/>
                    <Button variant='contained' type='submit' sx={{color: "#5D6D7E", backgroundColor: "#ABEBC6"}}>Submit</Button>
                </Stack>
            </Box>
        </div>
  );
}

export default UpdateTripImageForm;
