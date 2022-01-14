import Container from '@mui/material/Container';
import TripCard from './TripCard';
import {useSelector, useDispatch} from 'react-redux'
import { setAllTrips } from './tripSlice';
import Box from '@mui/material/Box';

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
            <Container>
                {tripCardList}
            </Container>
        </>
    )
}

export default TripCardContainer
