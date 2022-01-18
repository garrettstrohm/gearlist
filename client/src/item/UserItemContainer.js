import React from 'react'
import List from '@mui/material/List'
import ItemCard from './ItemCard'
import {useSelector, useDispatch} from 'react-redux'
import { setAllUserItems } from './itemSlice'

function UserItemContainer() {
    const items = useSelector(state => state.items.userItems)
    const user = useSelector(state => state.user.user)
    const itemList = items?.map(item => <ItemCard key={item.id} item={item} handleDelete={handleDelete}/>)
    const dispatch = useDispatch()
   
    function handleDelete(id){
        fetch(`/user_items/${id}`, {method: 'DELETE'})
        .then(() => {
            const newItems = items.filter(item => item.id !== id)
            dispatch(setAllUserItems([...newItems]))
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

export default UserItemContainer
