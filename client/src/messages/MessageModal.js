import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MessageList from './MessageList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function MessageModal({open, handleClose, trip, mem}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {open === true ? <MessageList tripId={trip.id} trip={trip} open={open} /> : null}
        </Box>
      </Modal>
    </div>
  );
}