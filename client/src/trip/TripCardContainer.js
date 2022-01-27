import TripCard from './TripCard';
import {useSelector, useDispatch} from 'react-redux'
import { setAllTrips } from './tripSlice';
import List from '@mui/material/List';
import SearchBar from '../main/SearchBar';
import {useState} from 'react'
import Button from '@mui/material/Button'

function TripCardContainer() {
    const [search, setSearch] = useState('')
    const [toggleSearch, setToggleSearch] = useState(false)
    const dispatch = useDispatch()
    const trips = useSelector(state => state.trips.trips)
    const tripsToDisplay = trips.filter(trip => trip.title.toLowerCase().includes(search.toLowerCase()))
    const tripCardList = tripsToDisplay?.map(trip => <TripCard key={trip.id} trip={trip} handleDelete={handleDelete}/>)

    function handleDelete(id){
        fetch(`/trips/${id}`, {method: "DELETE"})
        .then(() => {
            const newTrips = trips.filter(trip => trip.id !== id)
            dispatch(setAllTrips([...newTrips]))
        })
    }

    return (
        <>
            <h2 style={{textAlign: "center", color: "#5D6D7E"}}>Your Organized Trips!</h2>
            <Button onClick={() => setToggleSearch(toggleSearch => !toggleSearch)} sx={{color: '#FF9B00'}}>Search Trips</Button>
            {toggleSearch ? <SearchBar search={search} setSearch={setSearch}/> : null}
            <List sx={{maxHeight: "75vh", overflow: 'auto'}}>
                    {tripCardList}
            </List>
        </>
    )
}

export default TripCardContainer
