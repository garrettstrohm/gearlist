import React, {useEffect, useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import {ActionCableContext} from '../index.js'
import List from '@mui/material/List'
import MessageEditor from './MessageEditor.js';
import { selectedMessagesByTrip } from './messagesSlice.js';
import MessageItem from './MessageItem.js';

function MessageList({tripId}) {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const userId = useSelector(state => state.user.user.id)
    const messages = useSelector(state => selectedMessagesByTrip(state, tripId))

    console.log(tripId)

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
        const data = { tripId, userId, content }
        channel.send(data)
      }

      const messageList = messages && messages?.map(message => <MessageItem key={message.id} message={message}/>)

  return (
        <List>
            {messageList}
            <MessageEditor sendMessage={sendMessage}/>
        </List>
    );
}

export default MessageList;
