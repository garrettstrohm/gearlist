import React from 'react'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { selectTrip } from './tripSlice'
import {useParams} from 'react-router-dom'
import NavBar from '../main/NavBar'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'

function TripPage() {
    const selectedTrip = useParams()
    const trip = useSelector(state => state.trips.selectedTrip)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(`/trips/${selectedTrip.id}`)
        .then(r => r.json())
        .then(tripObj => {
            dispatch(selectTrip(tripObj))
        })
    }, [])
    console.log("user:", user)
    console.log(trip)


    return (
        <div>
            <NavBar />
            <Box sx={{position: "fixed", height: '100vh', width: "100%", flexGrow: 1, backgroundColor: "#EAECEE"}}>
                <Grid container columnSpacing={2} justifyContent="center" padding="75px 20px" overflow="auto">
                    <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="div" sx={{color: "#5D6D7E"}}>
                        Welcome, {user.first_name} {user.last_name}!
                    </Typography>
                        <Box sx={{maxWidth: "100%", maxHeight: "300px", marginTop: '20px', textAlign: 'center'}}>
                            <img src={trip.image} alt={`${trip.title} image`} style={{'maxWidth': '100%', maxHeight: 'auto'}}/>
                        </Box>
                        <Box sx={{border: 1, borderColor: "#5D6D7E", maxWidth: '100%', height: "300px", overflow: 'auto', padding: '10px'}}>
                            <Typography variant="p" sx={{color: "#5D6D7E"}}>
                                {trip.description}
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={4} sx={{textAlign: 'center'}}>
                        <Typography gutterBottom variant="h4" component="div" sx={{color: "#5D6D7E"}}>
                            {trip.title}
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={4}>
                        
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default TripPage
