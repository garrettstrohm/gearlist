import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userAuth/userSlice.js'
import tripReducer from './trip/tripSlice.js'
import adventureReducer from './adventure/adventureSlice.js'
import itemReducer from './item/itemSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        trips: tripReducer,
        adventures: adventureReducer,
        items: itemReducer
    }
})

export default store;