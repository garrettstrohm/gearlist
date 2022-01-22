import React, {useState, useContext, useEffect} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MessageModal from './MessageModal';
import { messageReceived } from '../messages/messagesSlice'
import {useDispatch} from 'react-redux'
import { ActionCableContext } from '../index.js';

function TripListItems({mem, trip}) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const cable = useContext(ActionCableContext)

    useEffect(() => {
        cable.subscriptions.create(
          { channel: 'MessagesChannel', id: trip.id },
          {
            received: (data) => {
                console.log("data:", data)
              dispatch(messageReceived(data))
            },
          }
        )
      }, [trip, dispatch])

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
