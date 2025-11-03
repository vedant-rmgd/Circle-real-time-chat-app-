import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUser: null, // info about authenticated user
    isCheckingAuth: true, // when ever user refreshes a page we will check if user is loggedin or not
    isSigningIn: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setIsCheckingAuth: (state, action) => {
            state.isCheckingAuth = action.payload;
        },
        setIsSigningIn: (state, action) => {
            state.isSigningIn = action.payload;
        },
        setIsLoggingIn: (state, action) => {
            state.isLoggingIn = action.payload;
        },
        setIsUpdatingProfile: (state, action) => {
            state.isUpdatingProfile = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        logoutUser: (state) => {
            state.authUser = null;
            state.onlineUsers = [];
        },
    },
});

export const {
    setAuthUser,
    setIsCheckingAuth,
    setIsSigningIn,
    setIsLoggingIn,
    setIsUpdatingProfile,
    setOnlineUsers,
    logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
