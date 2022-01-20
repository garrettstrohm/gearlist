import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'adventures',
    initialState: {
        adventures: [],
        selectedAdventure: {},
        adventurers: []
    },
    reducers: {
        setAllAdventures: (state, action) => {
            state.adventures = action.payload
        },
        selectAdventure: (state, action) => {
            state.selectedAdventure = action.payload
        },
        setAllAdventurers: (state, action) => {
            state.adventurers = action.payload
        }
    }
})

const {setAllAdventures, selectAdventure, setAllAdventurers} = slice.actions

export { setAllAdventures, selectAdventure, setAllAdventurers }

export default slice.reducer;