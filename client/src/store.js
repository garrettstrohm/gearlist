import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userAuth/userSlice.js'
import tripReducer from './trip/tripSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        trips: tripReducer,
    }
})

export default store;