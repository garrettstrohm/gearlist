import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.user = action.payload
        }
    }
})

const {setCurrentUser} = slice.actions

export { setCurrentUser }

export default slice.reducer;