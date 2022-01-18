import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {setAllAdventures} from '../adventure/adventureSlice.js'
import { useDispatch, useSelector } from 'react-redux';


export default function AddAdventurerForm({setAdventuresToDisplay}) {
    const [form, setForm] = useState({
        trip_id: "",
        email: "",
    })

    const selectedTrip = useParams()
    const dispatch = useDispatch()
    const adventures = useSelector(state => state.adventures.adventures)

    function handleSubmit(e){
        e.preventDefault()
        const newAdventure = {
            trip_id: selectedTrip.id,
            email: form.email
        }

        const configObj={
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAdventure)
        }

        fetch('/user_trips', configObj)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setForm({
                trip_id: "",
                email: "",
            })
            dispatch(setAllAdventures([data, ...adventures]))
        })
    }

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div>
      <Stack direction="row">
          <Box component="form" onChange={handleChange} onSubmit={handleSubmit}>
            <TextField
                label="Add Adventurer via Email" 
                margin="normal"
                id="email"
                name="email"
                value={form.email}
                autoFocus
            />
            <Button type="submit" variant="contained" sx={{margin: "22px", color: "#5D6D7E", backgroundColor: "#ABEBC6"}}>
                Submit
            </Button>
        </Box>
      </Stack>
    </div>
  );
}