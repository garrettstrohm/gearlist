import NavBar from './NavBar'
import TripCardContainer from '../trip/TripCardContainer'
import AdventureCardContainer from '../adventure/AdventureCardContainer';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAllTrips} from '../trip/tripSlice.js'
import Box from '@mui/material/Box';
import { setAllAdventures } from '../adventure/adventureSlice';

function HomePage() {
    const dispatch = useDispatch()
    const trips = useSelector(state => state.trips.trips)
    const user = useSelector(state => state.user.user)
    const adventures = useSelector(state => state.adventures.adventures)
    const tripMems = useSelector(state => state.trips.tripMemberships)
    console.log('mems:', tripMems)
    useEffect(() => {
        fetch('/trips')
        .then((r) => {
            if(r.ok){
                r.json().then(data => {
                dispatch(setAllTrips(data))
             })
            } else {
                return null
            }
        })
    },[user])

    useEffect(() => {
        fetch('/user_trips')
        .then((r) => {
            if(r.ok){
                r.json().then(data => {
                    console.log('adventures:', data)
                dispatch(setAllAdventures(data))
            })
            } else {
                return null
            }
        })
    },[user])

    if (trips === null && adventures === null){
        return null
    } else {
    return (

            <div>
                <NavBar />
                <Box sx={{position: "fixed", height: '100vh', width: "100%", flexGrow: 1, backgroundColor: "#EAECEE"}}>
                <Grid container columnSpacing={6} justifyContent="center" padding="100px" overflow="auto">
                    <Grid item xs={6} xl={4}>
                        <TripCardContainer />
                    </Grid>
                    <Grid item xs={6} xl={4}>
                        <AdventureCardContainer />
                    </Grid>
                </Grid>
                </Box>
            </div>
        )
    }
}

export default HomePage
