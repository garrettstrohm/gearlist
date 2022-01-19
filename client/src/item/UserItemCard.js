import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from 'react-redux'
import { setAllUserItems } from './itemSlice';
import {useState} from 'react'

function UserItemCard({item, handleDelete}) {
    const [cardItem, setCardItem] = useState({
        acquired: item.acquired
    })
    const dispatch = useDispatch()
    const userItems = useSelector(state => state.items.userItems)

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
        fetch(`/user_items/${id}`, configObj)
        .then(r => r.json())
        .then(data => {
            const updatedItems = userItems.map(item => {
                if(item.id === data.id){
                    return data
                } else {
                    return item
                }
            })
            dispatch(setAllUserItems(updatedItems))
            setCardItem({acquired: data.acquired})
        })
    }
    if(item === null){
        return null
    } else {
    return (
        <div>
            <Box sx={{ minWidth: 275, marginTop: '3px' }}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {item.item.name}
                            </Typography>
                            <Typography variant="body2">
                                Quantity: {item.quantity}
                            </Typography>
                            Acquired: <Checkbox checked={cardItem.acquired} onChange={() => handleUpdate(item.id)} inputProps={{ 'aria-label': 'controlled' }}/>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleDelete(item.id)}>Remove</Button>
                        </CardActions>
                    </React.Fragment>  
                </Card>
            </Box>
        </div>
    )
}
}

export default UserItemCard