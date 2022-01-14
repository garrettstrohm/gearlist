import NavBar from './NavBar'
import TripCardContainer from '../trip/TripCardContainer'
import Grid from '@mui/material/Grid';
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAllTrips} from '../trip/tripSlice.js'
import Box from '@mui/material/Box';

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

    return (

        <div>
            <NavBar />
            <Box sx={{height: '100vh', width: 1, overflow: 'auto', flexGrow: 1, backgroundColor: "#000"}}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TripCardContainer />
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>
            </Box>
        </div>
    )
}

export default HomePage
