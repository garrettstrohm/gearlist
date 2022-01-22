import React, { useState} from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'


export default function MessageEditor({sendMessage, tripId}) {
  const [value, setValue] = useState('');
  console.log(value)


  function handleSend(){
    sendMessage(value)
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
      <Button onClick={handleSend}>Send</Button>
    </>
  );
}