import React, {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MessageModal from './MessageModal';


function TripListItems({mem, trip}) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
      <>
        <MessageModal mem={mem} trip={trip} open={open} handleClose={handleClose}/>
        <ListItem button key={trip.title} onClick={handleOpen}>
            <ListItemText primary={`${trip.title} Chat`}/>
        </ListItem>
        </>
    );
}

export default TripListItems;
