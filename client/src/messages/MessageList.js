import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List'
import MessageEditor from './MessageEditor.js';
import MessageItem from './MessageItem.js';
import {setMessages} from './messagesSlice.js'
import {createConsumer} from '@rails/actioncable'

function MessageList({tripId, trip}) {
    const userId = useSelector(state => state.user.user).id
    const messages = useSelector(state => state.messages.messages)
    const cable = useRef()
    const scrollRef = useRef(null)
    const dispatch = useDispatch()
 
    useEffect(() => {
        if(!cable.current) {
          cable.current = createConsumer(process.env.REACT_APP_WS_ROOT)
        }
        if(scrollRef.current){
          scrollRef.current.scrollIntoView({ behaviour: "smooth" })
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
    
      const messageList = messages?.filter(message => message.trip_id === tripId)?.map(message => <MessageItem key={message.created_at} message={message} scrollRef={scrollRef}/>)

  return (
        <>
        <List sx={{overflow: 'auto', height: '350px'}}>
            {messageList}
        </List>
        <MessageEditor tripId={tripId} userId={userId} trip={trip}/>
        </>
    );
}

export default MessageList;
