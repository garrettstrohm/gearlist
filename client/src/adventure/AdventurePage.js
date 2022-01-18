import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import NavBar from '../main/NavBar'
import Typography from '@mui/material/Typography';
import {Row, Col, Container} from "react-bootstrap";
import {selectAdventure, setAllAdventures} from './adventureSlice'
import { selectTrip } from '../trip/tripSlice'
import { setAllTripItems, setAllAdventureItems } from '../item/itemSlice'
import AdventurerCardContainer from '../trip/AdventurerCardContainer'
import TripItemContainer from '../item/TripItemContainer'
import CreateTripItemForm from '../item/CreateTripItemForm'
import CreateItemFilter from '../item/CreateItemFilter'
import UserItemContainer from '../item/UserItemContainer'
import Button from '@mui/material/Button'



function AdventurePage() {
    const selectedAdventure = useParams()
    const adventure = useSelector(state => state.adventures.selectedAdventure)
    const tripItems = useSelector(state => state.items.tripItems)
    const user = useSelector(state => state.user.user)
    const trip = useSelector(state => state.trips.selectedTrip)
    console.log(trip)
    console.log("testAdv", adventure)

    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [form, setForm] = useState({
        title: "",
        image: "",
        date: "",
        location: "",
        description: ""
    })
    const [itemCategory, setItemCategory] = useState('tripItem')
    const [toggleItemForm, setToggleItemForm] = useState(false)

  
    useEffect(() => {
        fetch(`/user_trips/${selectedAdventure.id}`)
        .then(r => r.json())
        .then(advObj => {
            dispatch(selectAdventure(advObj))
            dispatch(selectTrip(advObj.trip))
        })
    }, [dispatch])

    useEffect(() => {
        fetch(`/this_trips_items/${trip.id}`)
        .then(r => r.json())
        .then(items => {
            console.log("items:",items)
            dispatch(setAllTripItems(items))
        })
    }, [dispatch])

    useEffect(() => {
        fetch(`/adventurers/${trip.id}`)
        .then(r => r.json())
        .then(data => {
            dispatch(setAllAdventures(data))
        })
    }, [adventure])

    useEffect(() => {
        fetch(`/this_trips_adventure_items/${selectedAdventure.id}`)
        .then(r => r.json())
        .then(items => dispatch(setAllAdventureItems(items)))
    }, [])

    const containerStyle = {
    padding: "5px", 
    height: "40vh", 
    maxWidth: "100%"
    }

    const containerClass = "border border-dark shadow overflow-auto"

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleCategoryChange(e){
        setItemCategory(e.target.value)
    }

    if (user === null){
        return null
    } else {
        return (
            <div>
                <NavBar />
                <Container style={{'maxWidth': '95%'}}>
                    <Row style={{"paddingTop": "90px"}}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>
                            Welcome, {user.first_name} {user.last_name}!
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E" }}>
                            Current Adventure: {adventure.trip.title}
                        </Typography>
                        <Col style={{"height": '45vh'}}>
                            <Button>Change Image</Button>
                            <Container style={containerStyle} className={containerClass}>
                                <img src={adventure.trip.image} alt={adventure.trip.title} style={{'maxHeight': 'auto', 'maxWidth': '100%'}}/>
                            </Container>
                        </Col>
                        <Col>
                            <Button onClick={() => setToggleItemForm(toggleItemForm => !toggleItemForm)}>Create Item</Button>
                            { toggleItemForm ?
                            <>
                            <CreateItemFilter handleCategoryChange={handleCategoryChange}/>
                            <CreateTripItemForm itemCategory={itemCategory}/>
                            </> : null
                            }
                            <Container style={containerStyle} className={containerClass}>
                                { tripItems.length > 0 ? <TripItemContainer /> : <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>Unfortunately, the creator of this trip hasn't created any trip items yet!</Typography>}
                            </Container>    
                        </Col>
                        <Col>
                            <Container style={containerStyle} className={containerClass}>
                                <AdventurerCardContainer />
                            </Container>    
                        </Col>
                    </Row>
                    <Row style={{"paddingTop": "20px"}}>
                        <Col style={{"height": '45vh'}}>
                            <Container style={containerStyle} className={containerClass} onDoubleClick={() => setToggle(false)}>
                                <Typography variant="h6" component="div" onDoubleClick={() => setToggle(false)} sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>
                                    {adventure.trip.description}
                                </Typography>
                            </Container>
                        </Col>
                        <Col>
                            <Container style={containerStyle} className={containerClass}>
                                { tripItems.length > 0 ? <UserItemContainer /> : <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>Unfortunately, the creator of this trip hasn't created any trip items yet!</Typography>}
                            </Container>    
                        </Col>
                        <Col>
                            <Container style={containerStyle} className={containerClass}>
                                Here be the future chat box.
                            </Container>    
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AdventurePage
