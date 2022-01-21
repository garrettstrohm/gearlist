import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'trips',
    initialState: {
        trips: [],
        selectedTrip: {},
        tripMemberships: []
    },
    reducers: {
        setAllTrips: (state, action) => {
            state.trips = action.payload
        },
        selectTrip: (state, action) => {
            state.selectedTrip = action.payload
        },
        setTripMemberships: (state, action) => {
            state.tripMemberships = action.payload
        }
    }
})

const {setAllTrips, selectTrip, setTripMemberships} = slice.actions

export { setAllTrips, selectTrip, setTripMemberships }

export default slice.reducer;