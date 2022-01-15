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

    useEffect(() => {
        fetch('/trips')
        .then(r => r.json())
        .then(data => {
            dispatch(setAllTrips(data))
            console.log(data)
        })
    },[])

    useEffect(() => {
        fetch('/user_trips')
        .then(r => r.json())
        .then(data => {
            dispatch(setAllAdventures(data))
            console.log(data)
        })
    })

    return (

        <div>
            <NavBar />
            <Box sx={{position: "fixed", height: '100vh', width: "100%", flexGrow: 1, backgroundColor: "#EAECEE"}}>
            <Grid container columnSpacing={3} justifyContent="center" padding="100px" overflow="auto">
                <Grid item xs={6}>
                    <TripCardContainer />
                </Grid>
                <Grid item xs={6}>
                    <AdventureCardContainer />
                </Grid>
            </Grid>
            </Box>
        </div>
    )
}

export default HomePage
