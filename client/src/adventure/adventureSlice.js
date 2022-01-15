import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'adventures',
    initialState: {
        adventures: [],
        selectedAdventure: {}
    },
    reducers: {
        setAllAdventures: (state, action) => {
            state.adventures = action.payload
        },
        selectAdventure: (state, action) => {
            state.selectedAdventure = action.payload
        }
    }
})

const {setAllAdventures, selectAdventure} = slice.actions

export { setAllAdventures, selectAdventure }

export default slice.reducer;