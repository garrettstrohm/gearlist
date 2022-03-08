import React, {useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import {setAllTrips} from './tripSlice'
import Stack from '@mui/material/Stack';
import  TextField  from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { imageHandleChange, handlePicSubmit } from '../functions.js'


function UpdateTripImageForm() {
    const trips = useSelector(state => state.trips.trips)
    const selectedTrip = useParams()
    const [picFile, setPicFile] = useState(null)

    const dispatch = useDispatch()
    const imageRef = useRef()

    function handleSubmit(data){
        const newImage = {
            image: data.secure_url,
            public_id: data.public_id
        }
        const configObj ={
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newImage)
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
        })
    }
    
  return (
        <div>
            <Box component='form' onSubmit={e => handlePicSubmit(e, handleSubmit, picFile)}>
                <Stack direction='row' spacing={2} marginBottom='5px'>
                    <TextField size='small' type='file' variant='standard' name='image' onChange={(e) => imageHandleChange(e, setPicFile, imageRef)} ref={imageRef}/>
                    <Button variant='contained' type='submit' sx={{color: "#5D6D7E", backgroundColor: "#ABEBC6"}}>Submit</Button>
                </Stack>
            </Box>
        </div>
  );
}

export default UpdateTripImageForm;
