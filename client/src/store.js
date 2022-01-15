import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userAuth/userSlice.js'
import tripReducer from './trip/tripSlice.js'
import adventureReducer from './adventure/adventureSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        trips: tripReducer,
        adventures: adventureReducer
    }
})

export default store;