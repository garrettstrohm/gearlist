import React from 'react'
import List from '@mui/material/List'
import TripItemCard from './TripItemCard'
import {useSelector, useDispatch} from 'react-redux'
import { setAllTripItems } from './itemSlice'

function TripItemContainer() {
    const items = useSelector(state => state.items.tripItems)
    const itemList = items?.map(item => <TripItemCard key={item.id} item={item} handleDelete={handleDelete}/>)
    const dispatch = useDispatch()
    console.log("test",items)

    function handleDelete(id){
        fetch(`/trip_items/${id}`, {method: 'DELETE'})
        .then(() => {
            const newItems = items.filter(item => item.id !== id)
            dispatch(setAllTripItems([...newItems]))
        })
    }

    return (
        <div>
            <List sx={{maxHeight: "100vh"}}>
                    {itemList}
            </List>
        </div>
    )
}

export default TripItemContainer
