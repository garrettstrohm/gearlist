import NavBar from './NavBar'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAllTrips} from '../trip/tripSlice.js'
import SideDrawer from './SideDrawer'

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
        </div>
    )
}

export default HomePage
