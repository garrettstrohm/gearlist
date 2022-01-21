import React, {useEffect, useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import {ActionCableContext} from '../index.js'
import List from '@mui/material/List'
import MessageEditor from './MessageEditor.js';

function MessageList({tripId}) {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const user = (state => state.user.user)

    console.log(user.id)

    useEffect(() => {
        const channel = cable.subscriptions.create({
          channel: 'MessagesChannel',
          id: tripId,
        })
    
        setChannel(channel)
    
        return () => {
          channel.unsubscribe()
        }
      }, [tripId])

      const sendMessage = (content) => {
        const data = { tripId, content }
        channel.send(data)
      }


  return (
        <List>
            {/* {renderedMessages} */}
            <MessageEditor sendMessage={sendMessage}/>
        </List>
    );
}

export default MessageList;
