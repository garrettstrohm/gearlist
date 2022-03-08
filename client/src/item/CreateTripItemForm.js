import * as React from 'react';
import Stack from '@mui/material/Stack';
import  TextField  from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {useState, useRef} from 'react'
import { setAllTripItems, setAllUserItems } from './itemSlice';
import {useSelector, useDispatch} from 'react-redux'
import { handleChange, imageHandleChange } from '../functions.js'

export default function CreateTripItemForm({itemCategory}) {
    const tripItems = useSelector(state => state.items.tripItems)
    const userItems = useSelector(state => state.items.userItems)
    const user = useSelector(state => state.user.user)
    const selectedTrip = useSelector(state => state.trips.selectedTrip)
    const [picFile, setPicFile] = useState(null)
    const[form, setForm] = useState({
        name:'',
        quantity:'',
        image: '',
        description: '',
        public_id: ''
    })

    const dispatch = useDispatch()
    const imageRef = useRef()

    function handleSubmit(e){
        e.preventDefault()
        if(itemCategory === 'tripItem'){
            const newTripItem = {
                trip_id: selectedTrip.id,
                name: form.name,
                quantity: parseInt(form.quantity),
                image: picFile,
                description: form.description,
                acquired: false
            }
            const configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTripItem)
            }
            fetch('/trip_items', configObj)
            .then(r => r.json())
            .then(data => {
                dispatch(setAllTripItems([data, ...tripItems]))
                setForm({
                    name:'',
                    quantity:'',
                    image: '',
                    description: ''
                })
            })

        } else if (itemCategory === 'userItem') {
            const newUserItem = {
                user_id: user.id,
                trip_id: selectedTrip.id,
                name: form.name,
                quantity: parseInt(form.quantity),
                image: form.image,
                description: form.description,
                acquired: false
            }
            const configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserItem)
            }
            fetch('/user_items', configObj)
            .then(r => r.json())
            .then(data => {
                dispatch(setAllUserItems([data, ...userItems]))
                setForm({
                    name:'',
                    quantity:'',
                    image: '',
                    description: '',
                    public_id: ''
                })
            })
        }
    }


  return (
    <div>
        <Box component="form" onChange={(e) => handleChange(e, form, setForm)} onSubmit={e => handleSubmit(e)}>
            <Stack direction="row" spacing={2} marginBottom="5px">
                <TextField size='small' variant='standard' name='name' value={form.name} label='Item Name'/>
                <TextField size='small' variant='standard' name='quantity' value={form.quantity} type='number' label='Item Quantity'/>
                <Button variant='contained' type='submit' sx={{color: "#5D6D7E", backgroundColor: "#ABEBC6"}}>Submit</Button>
            </Stack>
            <TextField size='small' variant='standard' name='image' type="file" value={form.image} onChange={(e) => imageHandleChange(e, setPicFile, imageRef)} fullWidth label='Image Link'/>
            <TextField size='small' type='textarea' name='description' value={form.description} maxRows={3} multiline label='Description' fullWidth sx={{margin: '5px 0px 5px 0px'}}/>
      </Box>
    </div>
  );
}