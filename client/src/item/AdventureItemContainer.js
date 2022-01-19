import React from 'react'
import List from '@mui/material/List'
import AdventureItemCard from './AdventureItemCard'
import {useSelector, useDispatch} from 'react-redux'
import { setAllAdventureItems } from './itemSlice'

function AdventureItemContainer() {
    const items = useSelector(state => state.items.adventureItems)
    const itemList = items?.map(item => <AdventureItemCard key={item.id} item={item} handleDelete={handleDelete}/>)
    const dispatch = useDispatch()
    console.log('itemsnow:', items)

    function handleDelete(id){
        fetch(`/adventure_items/${id}`, {method: 'DELETE'})
        .then(() => {
            const newItems = items.filter(item => item.id !== id)
            dispatch(setAllAdventureItems([...newItems]))
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

export default AdventureItemContainer
