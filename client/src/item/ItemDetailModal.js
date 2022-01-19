import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ItemDetailModal({open, handleClose, item, quantity, acquired}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={item.image} alt={item.name} style={{maxHeight: '300px', maxWidth: '500px', justifyContent: 'center', display: 'block', margin: 'auto'}}/>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginTop: '15px', marginBottom: '15px', textAlign: 'center'}}>
            {item.name}
          </Typography>
          <Stack direction='row' spacing={5} sx={{justifyContent: 'center'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '15px', textAlign: 'center'}}>
            Quantity: {quantity}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '15px', textAlign: 'center'}}>
            Acquired: {acquired === false ? "False": "True"}
          </Typography>
          </Stack>
          <Divider />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {item.description}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}