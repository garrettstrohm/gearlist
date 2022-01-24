import React from 'react';
import List from '@mui/material/List';
import TripListItems from './TripListItems.js'
import {useSelector} from 'react-redux'

function TripList() {
  const mems = useSelector(state => state.trips.tripMemberships)

  const tripListItems = mems?.map(mem => <TripListItems key={mem.id} mem={mem} trip={mem.trip}/>)
  return (
        <List>
            {tripListItems}
        </List>
    );
}

export default TripList;
