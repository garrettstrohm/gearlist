import React, { useState} from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import {useSelector} from 'react-redux'
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";

export default function MessageEditor({tripId, userId, trip}) {
  const [value, setValue] = useState('');
  const user = useSelector(state => state.user.user)


  function handleSend(e){
    e.preventDefault()
    if(value !== ''){
      fetch('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: value,
          trip_id: tripId,
          user_id: userId,
          username: user.username
        }
        )
      })
    }
    setValue('')
  }

  return (
    <>
    <Box component="form" onSubmit={handleSend}>
      <Stack direction='row'>
          <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label={`Message ${trip.title} Chat...`}
              name="title"
              value={value}
              onChange={e => setValue(e.target.value)}
              autoFocus
            />
            <Button type='submit' sx={{marginTop: '6px', color: "#ABEBC6"}}><SendIcon fontSize="large"/></Button>
          </Stack>
      </Box>
    </>
  );
}