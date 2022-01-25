import React from 'react'
import List from '@mui/material/List'
import TripItemCard from './TripItemCard'
import {useSelector, useDispatch} from 'react-redux'
import { setAllTripItems } from './itemSlice'

function TripItemContainer() {
    const items = useSelector(state => state.items.tripItems)
    const itemList = items?.map(item => <TripItemCard key={item.id} item={item} handleDelete={handleDelete}/>)
    const dispatch = useDispatch()

    function handleDelete(id){
        fetch(`/trip_items/${id}`, {method: 'DELETE'})
        .then((r) => {
            if(r.ok){
                const newItems = items.filter(item => item.id !== id)
                dispatch(setAllTripItems([...newItems]))
            } else {
                r.json().then(errors => alert(errors.error))
            }
        })
    }

    return (
        <div>
            <List sx={{maxHeight: "100vh"}}>
                    {items.length > 0 ? itemList: null}
            </List>
        </div>
    )
}

export default TripItemContainer
