import React, {useState, useRef} from 'react';
import Stack from '@mui/material/Stack';
import TextField  from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { setAllAdventureItems } from './itemSlice';
import {useSelector, useDispatch} from 'react-redux';
import { handleChange, imageHandleChange, handlePicSubmit } from '../functions';

export default function CreateAdventureItemForm() {
    const adventureItems = useSelector(state => state.items.adventureItems)
    const selectedAdv = useSelector(state => state.adventures.selectedAdventure)
    const [picFile, setPicFile] = useState(null)
    const[form, setForm] = useState({
        name:'',
        quantity:'',
        description: ''
    })

    const dispatch = useDispatch()
    const imageRef = useRef()

    function handleSubmit(data){
        const newAdvItem = {
            user_trip_id: selectedAdv.id,
            name: form.name,
            quantity: parseInt(form.quantity),
            image: data.secure_url,
            public_id: data.public_id,
            description: form.description,
            acquired: false
        }
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAdvItem)
        }
        fetch('/adventure_items', configObj)
        .then(r => r.json())
        .then(data => {
            dispatch(setAllAdventureItems([data, ...adventureItems]))
        })

    }


  return (
    <div>
        <Box component="form" onChange={(e) => handleChange(e, form, setForm)} onSubmit={e => handlePicSubmit(e, handleSubmit, picFile)}>
            <Stack direction="row" spacing={2} marginBottom="5px">
                <TextField size='small' variant='standard' name='name' value={form.name} label='Item Name'/>
                <TextField size='small' variant='standard' name='quantity' value={form.quantity} type='number' label='Item Quantity'/>
                <Button variant='contained' type='submit' sx={{color: "#5D6D7E", backgroundColor: "#ABEBC6"}}>Submit</Button>
            </Stack>
            <TextField size='small' variant='standard' name='image' ref={imageRef} onChange={(e) => imageHandleChange(e, setPicFile, imageRef)} fullWidth label='Image Link'/>
            <TextField size='small' type='textarea' name='description' value={form.description} maxRows={3} multiline label='Description' fullWidth sx={{margin: '5px 0px 5px 0px'}}/>
      </Box>
    </div>
  );
}