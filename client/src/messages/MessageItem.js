import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack'

function MessageItem({message, username}) {

    return (
            <ListItem>
                <Stack direction='row' spacing={2}>
                    {/* <ListItemText primary={`${username}: `}/> */}
                    <ListItemText primary={message.content}/>
                </Stack>
            </ListItem>
        );
    }

export default MessageItem;
