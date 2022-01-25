import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import NavBar from '../main/NavBar'
import Typography from '@mui/material/Typography';
import {Row, Col, Container} from "react-bootstrap";
import {selectAdventure, setAllAdventurers} from './adventureSlice'
import { setAllTripItems, setAllAdventureItems } from '../item/itemSlice'
import AdventurerCardContainer from '../trip/AdventurerCardContainer'
import TripItemContainer from '../item/TripItemContainer'
import Button from '@mui/material/Button'
import CreateAdventureItemForm from '../item/CreateAdventureItemForm'
import AdventureItemContainer from '../item/AdventureItemContainer'
import Stack from '@mui/material/Stack'

function AdventurePage() {
    const selectedAdventure = useParams()
    const adventure = useSelector(state => state.adventures.selectedAdventure)
    const tripItems = useSelector(state => state.items.tripItems)
    const user = useSelector(state => state.user.user)
    const advItems = useSelector(state => state.items.adventureItems)
    console.log("testAdv", advItems)

    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [form, setForm] = useState({
        title: "",
        image: "",
        date: "",
        location: "",
        description: ""
    })
    const [trip, setTrip] = useState({})
    const [toggleItemForm, setToggleItemForm] = useState(false)

  
    useEffect(() => {
        fetch(`/user_trips/${selectedAdventure.id}`)
        .then(r => r.json())
        .then(advObj => {
            setTrip(advObj.trip)
            dispatch(selectAdventure(advObj))
        })
    }, [dispatch])

    useEffect(() => {
        fetch(`/this_trips_items/${trip.id}`)
        .then(r => r.json())
        .then(items => {
            console.log("items:",items)
            dispatch(setAllTripItems(items))
        })
    }, [trip, dispatch])

    useEffect(() => {
        fetch(`/adventurers/${trip.id}`)
        .then(r => r.json())
        .then(data => {
            console.log('adventurers:', data)
            dispatch(setAllAdventurers(data))
        })
    }, [adventure])

    useEffect(() => {
        fetch(`/this_trips_adventure_items/${selectedAdventure.id}`)
        .then(r => r.json())
        .then(items => dispatch(setAllAdventureItems(items)))
    }, [dispatch])

    const containerStyle = {
    padding: "5px", 
    height: "40vh", 
    maxWidth: "100%"
    }

    const containerClass = "border shadow overflow-auto"


    if (user === null){
        return null
    } else {
        return (
            <div>
                <NavBar />
                <Container style={{'maxWidth': '95%'}}>
                    <Row style={{"paddingTop": "90px"}}>
                    <Stack direction='row' spacing={10}>
                        <Typography variant="h6" sx={{color: "#5D6D7E", paddingBottom: '10px' }}>
                            Welcome, {user.first_name} {user.last_name}!
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#5D6D7E" }}>
                            Current Adventure: {trip.title}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#5D6D7E" }}>
                            Date: {trip.date}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#5D6D7E" }}>
                            Location: {trip.location}
                        </Typography>
                        </Stack>
                        <Col style={{"height": '45vh', 'marginTop': '37px'}}>
                            <Container style={containerStyle} className={containerClass}>
                                <img src={trip.image} alt={trip.title} style={{'maxHeight': 'auto', 'maxWidth': '100%'}}/>
                            </Container>
                        </Col>
                        <Col>
                            <Button onClick={() => setToggleItemForm(toggleItemForm => !toggleItemForm)}>Create Item</Button>
                            { toggleItemForm ? <CreateAdventureItemForm /> : null }
                            <Container style={containerStyle} className={containerClass}>
                                { tripItems.length > 0 ? <TripItemContainer /> : <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>Unfortunately, the creator of this trip hasn't created any trip items yet!</Typography>}
                            </Container>    
                        </Col>
                        <Col style={{ "height": '45vh', 'marginTop': '37px'}}>
                            <Container style={containerStyle} className={containerClass}>
                                {trip !== null ? <AdventurerCardContainer /> : null}
                            </Container>    
                        </Col>
                    </Row>
                    <Row style={{"paddingTop": "20px"}}>
                        <Col style={{"height": '45vh'}}>
                            <Container style={containerStyle} className={containerClass} onDoubleClick={() => setToggle(false)}>
                                <Typography variant="h6" component="div" onDoubleClick={() => setToggle(false)} sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>
                                    {trip.description}
                                </Typography>
                            </Container>
                        </Col>
                        <Col>
                            <Container style={containerStyle} className={containerClass}>
                                { advItems.length > 0 ? <AdventureItemContainer /> : <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>Need to make a list of personal items? Click create item at the top of this column and create one!</Typography>}
                            </Container>    
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AdventurePage
