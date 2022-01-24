import { createSlice } from "@reduxjs/toolkit"


const slice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        messagesToDisplay: []
    },
    reducers: {
        setMessages(state, action){
            state.messages = action.payload
        },
        setMessagesToDisplay(state, action){
            state.messagesToDisplay = action.payload
        }
    }
})

export const {setMessages, setMessagesToDisplay} = slice.actions

export default slice.reducer