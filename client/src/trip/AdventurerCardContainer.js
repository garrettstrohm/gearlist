import React from 'react'
import {setAllAdventurers} from '../adventure/adventureSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import List from '@mui/material/List';
import AdventurerCard from './AdventurerCard.js';

function AdventurerCardContainer() {
    const adventurers = useSelector(state => state.adventures.adventurers)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    function handleDeleteAdventurer(id){
        fetch(`/user_trips/${id}`, {method: "DELETE"})
        .then((r) => {
            if(r.ok){
                const newAdventurers = adventurers.filter(adventurer => adventurer.id !== id)
            dispatch(setAllAdventurers([...newAdventurers]))
            } else {
                r.json().then(error => {
                    alert(error.error)
                })
            } 
        })
    }

    const adventurerList = adventurers?.filter(userTrip => userTrip.user.id !== user.id)?.map(userTrip => <AdventurerCard key={userTrip.id} handleDeleteAdventurer={handleDeleteAdventurer} adventure={userTrip} adventurer={userTrip.user}/>)
    return (
        <div>
            <List sx={{maxHeight: "100vh"}}>
                    {adventurers.length > 0 ? adventurerList : null}
            </List>
        </div>
    )
}

export default AdventurerCardContainer
