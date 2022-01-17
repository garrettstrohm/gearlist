import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { selectTrip } from './tripSlice'
import {useParams} from 'react-router-dom'
import NavBar from '../main/NavBar'
import Typography from '@mui/material/Typography';
import {setCurrentUser} from '../userAuth/userSlice.js'
import {Row, Col, Container} from "react-bootstrap";
import TextField from '@mui/material/TextField';
import AdventurerCardContainer from './AdventurerCardContainer'
import TripItemContainer from '../item/TripItemContainer'



function TripPage() {
    const selectedTrip = useParams()
    const trip = useSelector(state => state.trips.selectedTrip)
    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [tripItems, setTripItems] = useState([])
    const [form, setForm] = useState({
        title: "",
        image: "",
        date: "",
        location: "",
        description: ""
    })

    useEffect(() => {
        fetch(`/trips/${selectedTrip.id}`)
        .then(r => r.json())
        .then(tripObj => {
            dispatch(selectTrip(tripObj))
            setTripItems(tripObj.trip_items)
            setForm({
                title: tripObj.title,
                image: tripObj.image,
                date: tripObj.date,
                location: tripObj.location,
                description: tripObj.description
            })
        })
    }, [toggle])

    console.log(tripItems)

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
            console.log("updated trip:", data)
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
                                <TripItemContainer items={tripItems} setItems={setTripItems}/>
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
}

export default TripPage
