import { createSlice, createSelector } from "@reduxjs/toolkit"


const slice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {
        messageReceived(state, action) {
            const data = action.payload
            const message = {
                id: data.id,
                content: data.content,
                tripId: data.trip_id,
                userId: data.user_id,
            }
            state.messages = [...state.messages, message]
        },
        setMessages(state, action){
            state.messages = action.payload
        }
    }
})

export const {messageReceived, setMessages} = slice.actions



export default slice.reducer