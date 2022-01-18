import React from 'react'
import {setAllAdventures} from '../adventure/adventureSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import List from '@mui/material/List';
import AdventurerCard from './AdventurerCard.js';
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import AddAdventurerForm from './AddAdventurerForm.js';

function AdventurerCardContainer() {
    const adventures = useSelector(state => state.adventures.adventures)
    const selectedTrip = useParams()
    const dispatch = useDispatch()

    function handleDeleteAdventurer(id){
        fetch(`/user_trips/${id}`, {method: "DELETE"})
        .then(() => {
            const newAdventures = adventures.filter(adventure => adventure.id !== id)
            dispatch(setAllAdventures([...newAdventures]))
        })
    }

    const adventurerList = adventures?.map(userTrip => <AdventurerCard key={userTrip.id} handleDeleteAdventurer={handleDeleteAdventurer} adventure={userTrip} adventurer={userTrip.user}/>)
    return (
        <div>
            <List sx={{maxHeight: "100vh"}}>
                    {adventurerList}
            </List>
        </div>
    )
}

export default AdventurerCardContainer
