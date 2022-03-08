import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from 'react-redux'
import { setAllAdventureItems } from './itemSlice';
import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ItemDetailModal from './ItemDetailModal';
import { handleChange } from '../functions.js'

function AdventureItemCard({item, handleDelete}) {
    const [cardItem, setCardItem] = useState({
        acquired: item.acquired
    })
    const [toggle, setToggle] = useState(true)
    const [form, setForm] = useState({
        quantity: item.quantity
    })
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()
    const adventureItems = useSelector(state => state.items.adventureItems)

    function handleUpdate(id){
        const updatedItem = {
            acquired: !cardItem.acquired
        }
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        }
        fetch(`/adventure_items/${id}`, configObj)
        .then(r => r.json())
        .then(data => {
            const updatedItems = adventureItems.map(item => {
                if(item.id === data.id){
                    return data
                } else {
                    return item
                }
            })
            dispatch(setAllAdventureItems(updatedItems))
            setCardItem({acquired: data.acquired})
        })
    }

    function handleInputSubmit(e){
        e.preventDefault()

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }

        fetch(`/adventure_items/${item.id}`, configObj)
        .then(r => r.json())
        .then(data => {
            const updatedItems = adventureItems.map(item => {
                if(item.id === data.id){
                    return data
                } else {
                    return item
                }
            })
            dispatch(setAllAdventureItems(updatedItems))
        })
    }

    if(item === null){
        return null
    } else {
    return (
        <div>
            <ItemDetailModal open={open} handleClose={handleClose} item={item.item} acquired={item.acquired} quantity={item.quantity}/>
            <Box sx={{ minWidth: 275, marginTop: '3px' }}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div" onClick={handleOpen} sx={{cursor: 'pointer'}}>
                                {item.item ? item.item.name : null}
                            </Typography>
                            {
                            toggle ? 
                            <Typography variant="body2" onDoubleClick={() => setToggle(false)}>
                                Quantity: {item.quantity}
                            </Typography> :
                            <Stack direction='row' spacing={5}>
                                Quantity:
                            <TextField
                                size='small'
                                variant='standard'
                                type='number'
                                value={form.quantity}
                                name='quantity'
                                onChange={(e) => handleChange(e, form, setForm)}
                                onKeyDown={e => {
                                    if(e.key === 'Enter'){
                                        handleInputSubmit(e)
                                        setToggle(true)
                                    } else if (e.key === 'Escape'){
                                        setToggle(true)
                                    }
                                }}
                                id='quantity'
                            />
                            </Stack> 
                            }
                            Acquired: <Checkbox checked={cardItem.acquired} onChange={() => handleUpdate(item.id)} inputProps={{ 'aria-label': 'controlled' }}/>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleDelete(item.id)} sx={{color: '#FF9B00'}}>Remove</Button>
                        </CardActions>
                    </React.Fragment>  
                </Card>
            </Box>
        </div>
    )
}
}

export default AdventureItemCard