import React, { useState} from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'


export default function MessageEditor({tripId, userId}) {
  const [value, setValue] = useState('');
  console.log(value)


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
          user_id: userId
        }
        )
      })
    }
    setValue('')
  }

  return (
    <>
      <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Name Your Trip!"
              name="title"
              value={value}
              onChange={e => setValue(e.target.value)}
              autoFocus
            />
      <Button type='submit' onClick={handleSend}>Send</Button>
    </>
  );
}