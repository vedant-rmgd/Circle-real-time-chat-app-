import {configureStore} from "@reduxjs/toolkit"
import authReducers from "../features/authSlice.js"
import themeReducer from "../features/themeSlice.js"
import chatReducer from "../features/chatSlice.js"

export const store = configureStore({
    reducer: {
        auth: authReducers,
        theme: themeReducer,
        chat: chatReducer
    }
})