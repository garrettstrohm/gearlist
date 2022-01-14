import Container from '@mui/material/Container';
import TripCard from './TripCard';
import {useSelector, useDispatch} from 'react-redux'
import { setAllTrips } from './tripSlice';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid'

function TripCardContainer() {
    const dispatch = useDispatch()
    const trips = useSelector(state => state.trips.trips)
    const tripCardList = trips?.map(trip => <TripCard key={trip.id} trip={trip} handleDelete={handleDelete}/>)

    function handleDelete(id){
        fetch(`/trips/${id}`, {method: "DELETE"})
        .then(() => {
            const newTrips = trips.filter(trip => trip.id !== id)
            dispatch(setAllTrips([...newTrips]))
        })
    }

    return (
        <>
            <h2 style={{textAlign: "center"}}>Your Organized Trips!</h2>
            <List sx={{maxHeight: "100vh", overflow: 'auto'}}>
                    {tripCardList}
            </List>
        </>
    )
}

export default TripCardContainer
