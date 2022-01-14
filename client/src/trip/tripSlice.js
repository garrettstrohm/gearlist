import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'trips',
    initialState: {
        trips: [],
        selectedTrip: {}
    },
    reducers: {
        setAllTrips: (state, action) => {
            state.trips = action.payload
        },
        selectTrip: (state, action) => {
            state.selectedTrip = action.payload
        }
    }
})

const {setAllTrips, selectTrip} = slice.actions

export { setAllTrips, selectTrip }

export default slice.reducer;