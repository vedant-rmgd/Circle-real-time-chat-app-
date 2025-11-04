import {configureStore} from "@reduxjs/toolkit"
import authReducers from "../features/authSlice.js"
import themeReducer from "../features/themeSlice.js"

export const store = configureStore({
    reducer: {
        auth: authReducers,
        theme: themeReducer
    }
})