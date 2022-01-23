import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MessageList from './MessageList';
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMessagesToDisplay } from './messagesSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MessageModal({open, handleClose, trip, mem}) {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages.messages)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MessageList tripId={trip.id}/>
        </Box>
      </Modal>
    </div>
  );
}