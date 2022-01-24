import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


function MessageItem({message, scrollRef}) {

    return (
            <ListItem ref={scrollRef}>
                <ListItemText primary={`${message.username}: ${message.content}`}/>
            </ListItem>
        );
    }

export default MessageItem;
