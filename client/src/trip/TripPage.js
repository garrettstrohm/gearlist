import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { selectTrip } from './tripSlice'
import {useParams} from 'react-router-dom'
import NavBar from '../main/NavBar'
import Typography from '@mui/material/Typography';
import {setCurrentUser} from '../userAuth/userSlice.js'
import {Row, Col, Container} from "react-bootstrap";


function TripPage() {
    const
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

    useEffect(() => {
        fetch("/me")
        .then((r) => r.json())
        .then(data => dispatch(setCurrentUser(data)))
      }, [])


    console.log("user:", user)
    console.log(trip)

      const containerStyle = {
        padding: "5px", 
        height: "40vh", 
        maxWidth: "100%"
      }

      const containerClass = "border border-dark shadow overflow-auto"

    return (
        <div>
            <NavBar />
            <Container style={{'maxWidth': '95%'}}>
                <Row style={{"paddingTop": "90px"}}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>
                        Welcome, {user.first_name} {user.last_name}!
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E" }}>
                        Current Trip: {trip.title}
                    </Typography>
                    <Col style={{"height": '45vh'}}>
                        <Container style={containerStyle} className={containerClass}>
                            <img src={trip.image} alt={trip.title} style={{'maxHeight': 'auto', 'maxWidth': '100%'}}/>
                        </Container>
                    </Col>
                    <Col>
                        <Container style={containerStyle} className={containerClass}>
                            test
                        </Container>    
                    </Col>
                    <Col>
                        <Container style={containerStyle} className={containerClass}>
                            Test
                        </Container>    
                    </Col>
                </Row>
                <Row style={{"paddingTop": "20px"}}>
                    <Col style={{"height": '45vh'}}>
                        <Container style={containerStyle} className={containerClass}>
                            {trip.description}
                        </Container>
                    </Col>
                    <Col>
                        <Container style={containerStyle} className={containerClass}>
                            Test
                        </Container>    
                    </Col>
                    <Col>
                        <Container style={containerStyle} className={containerClass}>
                            Test
                        </Container>    
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TripPage
