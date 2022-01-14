import Container from '@mui/material/Container';
import TripCard from './TripCard';
import {useSelector} from 'react-redux'
import Box from '@mui/material/Box';

function TripCardContainer() {
    const trips = useSelector(state => state.trips.trips)
    const tripCardList = trips?.map(trip => <TripCard key={trip.id} trip={trip}/>)

    return (
        <>
            <Container>
                {tripCardList}
            </Container>
        </>
    )
}

export default TripCardContainer
