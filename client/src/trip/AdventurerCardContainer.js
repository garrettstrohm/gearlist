import React from 'react'
import {setAllAdventurers} from '../adventure/adventureSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import List from '@mui/material/List';
import AdventurerCard from './AdventurerCard.js';
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import AddAdventurerForm from './AddAdventurerForm.js';

function AdventurerCardContainer() {
    const adventurers = useSelector(state => state.adventures.adventurers)
    const dispatch = useDispatch()

    function handleDeleteAdventurer(id){
        fetch(`/user_trips/${id}`, {method: "DELETE"})
        .then(() => {
            const newAdventurers = adventurers.filter(adventurer => adventurer.id !== id)
            dispatch(setAllAdventurers([...newAdventurers]))
        })
    }

    const adventurerList = adventurers?.map(userTrip => <AdventurerCard key={userTrip.id} handleDeleteAdventurer={handleDeleteAdventurer} adventure={userTrip} adventurer={userTrip.user}/>)
    return (
        <div>
            <List sx={{maxHeight: "100vh"}}>
                    {adventurerList}
            </List>
        </div>
    )
}

export default AdventurerCardContainer
