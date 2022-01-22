import React, {useEffect, useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import {ActionCableContext} from '../index.js'
import List from '@mui/material/List'
import MessageEditor from './MessageEditor.js';
import MessageItem from './MessageItem.js';
import {selectMessagesByTrip} from './messagesSlice.js'

function MessageList({tripId}) {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const userId = useSelector(state => state.user.user.id)
    const messages = useSelector(state => state.messages.messages)
    console.log(messages)
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

      const messagesToDisplay = messages.filter(message => message.trip_id === tripId)
      const messageList = messagesToDisplay?.map(message => <MessageItem key={message.id} message={message}/>)

  return (
        <>
        <List sx={{overflow: 'auto', height: '300px'}}>
            {messageList}
        </List>
        <MessageEditor sendMessage={sendMessage} tripId={tripId}/>
        </>
    );
}

export default MessageList;
