import React, {useEffect, useState, useContext, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ActionCableContext} from '../index.js'
import List from '@mui/material/List'
import MessageEditor from './MessageEditor.js';
import MessageItem from './MessageItem.js';
import {setMessages} from './messagesSlice.js'
import {createConsumer} from '@rails/actioncable'

function MessageList({tripId}) {
    const userId = useSelector(state => state.user.user).id
    const messages = useSelector(state => state.messages.messages)
    const cable = useRef()
    const dispatch = useDispatch()
 
    useEffect(() => {
        if(!cable.current) {
          cable.current = createConsumer('ws://localhost:3000/cable')
        }
        const paramsToSend = {
          channel: "MessagesChannel",
          id: tripId
        }
        const handlers = {
          received(data) {
            dispatch(setMessages([...messages, data]))
          },
          connected() {
            console.log('connected')
          },
          disconnected() {
            console.log('disconnected')
            cable.current = null
          }
        }

        const subscription = cable.current.subscriptions.create(paramsToSend, handlers)
        return function cleanup() {
          console.log('unsubbing from:', tripId)
          cable.current = null
          subscription.unsubscribe()
        }
      }, [tripId, messages])
    
      const messageList = messages?.filter(message => message.trip_id === tripId)?.map(message => <MessageItem key={message.created_at} message={message}/>)

  return (
        <>
        <List sx={{overflow: 'auto', height: '300px'}}>
            {messageList}
        </List>
        <MessageEditor tripId={tripId} userId={userId}/>
        </>
    );
}

export default MessageList;
