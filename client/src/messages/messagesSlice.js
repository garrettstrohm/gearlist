import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit"

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState({
    status: 'idle',
    error: null,
})

const slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        messageReceived(state, action) {
            const data = action.payload.data
            const message = {
                id: data.id,
                ...data.attributes,
                tripId: data.relationships.trip.data.id,
                userId: data.relationships.user.data.id,
            }
            messagesAdapter.addOne(state, message)
        }
    }
})

export const {messageReceived} = slice.actions

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(state => state.messages)

export const selectedMessagesByTrip = createSelector(
    [selectAllMessages, (state, tripId) => tripId],
    (messages, tripId) => messages.filter((message) => message.tripId === tripId)
)

export default slice.reducer