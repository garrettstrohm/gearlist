import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'items',
    initialState: {
        tripItems: [],
        userItems: [],
        adventureItems: [],
        selectedItem: {}
    },
    reducers: {
        setAllTripItems: (state, action) => {
            state.tripItems = action.payload
        },
        setAllUserItems: (state, action) => {
            state.useItems = action.payload
        },
        setAllAdventureItems: (state, action) => {
            state.adventureItems = action.payload
        },
        selectItem: (state, action) => {
            state.selectedItem = action.payload
        }
    }
})

const {setAllTripItems, setAllUserItems, setAllAdventureItems, selectItem} = slice.actions

export { setAllTripItems, setAllUserItems, setAllAdventureItems, selectItem }

export default slice.reducer;