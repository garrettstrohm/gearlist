import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { selectTrip } from './tripSlice'
import { setAllTripItems, setAllUserItems } from '../item/itemSlice'
import {setAllAdventurers} from '../adventure/adventureSlice'
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
import UpdateTripImageForm from './UpdateTripImageForm'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import homepage from '../assets/homepage-bg.jpeg'

const backgroundImageStyle = {
    backgroundImage: `url(${homepage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'fixed',
    minHeight: '100vh',
    position: 'absolute',
    width: "100%",
    flexGrow: 1
  }


const containerStyle = {
    padding: "10px 20px", 
    height: "30rem", 
    maxWidth: "100%",
    backgroundColor: '#fff',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center'
}
const imageContainerStyle = {
    ...containerStyle,
    padding: "15px 10px",
    textAlign: 'center'
}

const containerClass = "border shadow overflow-auto"

function TripPage() {
    const selectedTrip = useParams()
    const trip = useSelector(state => state.trips.selectedTrip)
    const user = useSelector(state => state.user.user)
    const userItems = useSelector(state => state.items.userItems)
    const trips = useSelector(state => state.trips.trips)

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
    const [toggleImageForm, setToggleImageForm] = useState(false)

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
                description: tripObj.description,
                public_id: tripObj.public_id
            })
        })
    }, [toggle, trips, dispatch, selectedTrip.id])

    useEffect(() => {
        fetch(`/this_trips_items/${selectedTrip.id}`)
        .then(r => r.json())
        .then(items => dispatch(setAllTripItems(items)))
    }, [dispatch, selectedTrip.id])

    useEffect(() => {
        fetch(`/this_trips_user_items/${selectedTrip.id}`)
        .then(r => r.json())
        .then(items => dispatch(setAllUserItems(items)))
    }, [dispatch, selectedTrip.id])

    useEffect(() => {
        fetch(`/adventurers/${selectedTrip.id}`)
        .then(r => r.json())
        .then(data => {
            dispatch(setAllAdventurers(data))
        })
    }, [dispatch, selectedTrip.id])

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

    if (trip === null || user === null){
        return null
    } else {
        return (
            <div>
                <NavBar />
                <Box style={backgroundImageStyle}>
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
                            <Button onClick={() => setToggleImageForm(toggleImageForm => !toggleImageForm)} sx={{color: '#FF9B00'}}>Change Image</Button>
                            {toggleImageForm ? <UpdateTripImageForm/> : null}
                            <Container style={imageContainerStyle} className={"border shadow overflow-hidden"}>
                                <img src={trip.image} alt={trip.title} style={{'maxHeight': '98%', 'maxWidth': '100%'}}/>
                            </Container>
                        </Col>
                        <Col>
                            <Button onClick={() => setToggleItemForm(toggleItemForm => !toggleItemForm)} sx={{color: '#FF9B00'}}>Create Item</Button>
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
                            <Button onClick={()=>setToggleAdventurerForm(toggleAdventurerForm => !toggleAdventurerForm)} sx={{color: '#FF9B00'}}>Add Adventurer</Button>
                            {toggleAdventurerForm ? <AddAdventurerForm /> : null}
                            <Container style={containerStyle} className={containerClass}>
                                <AdventurerCardContainer />
                            </Container>    
                        </Col>
                    </Row>
                    <Row style={{"padding": "20px 0"}}>
                        <Col style={{"height": '45vh'}}>
                            {toggle ? <Container style={containerStyle} className={containerClass} onDoubleClick={() => setToggle(false)}>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>
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
                                {userItems.length > 0 ? <UserItemContainer /> : <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#5D6D7E", paddingBottom: '10px' }}>You can create a list of personal items for your upcoming trip here. Click create item near the top of the page, and select personal item from the drop down.</Typography>}
                            </Container>    
                        </Col>
                    </Row>
                </Container>
                </Box>
            </div>
        )
    }
}

export default TripPage
