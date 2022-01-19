import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { selectTrip } from './tripSlice'
import { setAllTripItems, setAllUserItems } from '../item/itemSlice'
import {setAllAdventures} from '../adventure/adventureSlice'
import {useParams} from 'react-router-dom'
import NavBar from '../main/NavBar'
import Typography from '@mui/material/Typography';
import {Row, Col, Container} from "react-bootstrap";
import TextField from '@mui/material/TextField';
import AdventurerCardContainer from './AdventurerCardContainer'
import TripItemContainer from '../item/TripItemContainer'
import CreateTripItemForm from '../item/CreateTripItemForm'
import CreateItemFilter from '../item/CreateItemFilter'
import UserItemContainer from '../item/UserItemContainer'
import AddAdventurerForm from './AddAdventurerForm'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'



function TripPage() {
    const selectedTrip = useParams()
    const trip = useSelector(state => state.trips.selectedTrip)
    const user = useSelector(state => state.user.user)

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
    const [toggleAdventurerForm, setToggleAdventurerForm] = useState(false)

    useEffect(() => {
        fetch(`/trips/${selectedTrip.id}`)
        .then(r => r.json())
        .then(tripObj => {
            dispatch(selectTrip(tripObj))
            setForm({
                title: tripObj.title,
                image: tripObj.image,
                date: tripObj.date,
                location: tripObj.location,
                description: tripObj.description
            })
        })
    }, [toggle])

    useEffect(() => {
        fetch(`/this_trips_items/${selectedTrip.id}`)
        .then(r => r.json())
        .then(items => dispatch(setAllTripItems(items)))
    }, [])

    useEffect(() => {
        fetch(`/this_trips_user_items/${selectedTrip.id}`)
        .then(r => r.json())
        .then(items => dispatch(setAllUserItems(items)))
    }, [])
    useEffect(() => {
        fetch(`/adventurers/${selectedTrip.id}`)
        .then(r => r.json())
        .then(data => {
            dispatch(setAllAdventures(data))
        })
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

    function handleInputSubmit(e){
        e.preventDefault()

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }
        fetch(`/trips/${selectedTrip.id}`, configObj)
        .then(r => r.json())
        .then(data => {
            dispatch(selectTrip({...trip, data}))
        })
    }

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
                            Current Trip: {trip.title}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#5D6D7E" }}>
                            Date: {trip.date}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#5D6D7E" }}>
                            Location: {trip.location}
                        </Typography>
                        </Stack>
                        <Col style={{"height": '45vh'}}>
                            <Button>Change Image</Button>
                            <Container style={containerStyle} className={containerClass}>
                                <img src={trip.image} alt={trip.title} style={{'maxHeight': 'auto', 'maxWidth': '100%'}}/>
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
                                <TripItemContainer />
                            </Container>    
                        </Col>
                        <Col>
                            <Button onClick={()=>setToggleAdventurerForm(toggleAdventurerForm => !toggleAdventurerForm)}>Add Adventurer</Button>
                            {toggleAdventurerForm ? <AddAdventurerForm /> : null}
                            <Container style={containerStyle} className={containerClass}>
                                <AdventurerCardContainer />
                            </Container>    
                        </Col>
                    </Row>
                    <Row style={{"paddingTop": "20px"}}>
                        <Col style={{"height": '45vh'}}>
                            {toggle ? <Container style={containerStyle} className={containerClass} onDoubleClick={() => setToggle(false)}>
                                <Typography variant="h6" component="div" onDoubleClick={() => setToggle(false)} sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>
                                    {trip.description}
                                </Typography>
                            </Container> : 
                                <Container style={containerStyle} className={containerClass}>
                                    {<TextField
                                        margin="normal"
                                        multiline
                                        maxRows={Infinity}
                                        fullWidth
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        onKeyDown={e => {
                                            if(e.key === 'Enter'){
                                                handleInputSubmit(e)
                                                setToggle(true)
                                            } else if (e.key === 'Escape'){
                                                setToggle(true)
                                            }
                                        }}
                                        type="textarea"
                                        id="description"
                                        />}
                                </Container>
                            }
                        </Col>
                        <Col>
                            <Container style={containerStyle} className={containerClass}>
                                <UserItemContainer />
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

export default TripPage
