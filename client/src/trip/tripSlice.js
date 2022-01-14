import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'trips',
    initialState: {
        trips: []
    },
    reducers: {
        setAllTrips: (state, action) => {
            state.trips = action.payload
        }
    }
})

const {setAllTrips} = slice.actions

export { setAllTrips }

export default slice.reducer;