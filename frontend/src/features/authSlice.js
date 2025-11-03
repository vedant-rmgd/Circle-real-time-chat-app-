import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const initialState = {
    authUser: null, // info about authenticated user
    isCheckingAuth: true, // when ever user refreshes a page we will check if user is loggedin or not
    isSigningUp: false,
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
            console.log("auth user -> ", state.authUser)
        },
        setIsCheckingAuth: (state, action) => {
            state.isCheckingAuth = action.payload;
        },
        setIsSigningUp: (state, action) => {
            state.isSigningUp = action.payload;
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
    setIsSigningUp,
    setIsLoggingIn,
    setIsUpdatingProfile,
    setOnlineUsers,
    logoutUser,
} = authSlice.actions;

export default authSlice.reducer;

export const checkAuth = () => async (dispatch) => {
    dispatch(setIsCheckingAuth(true));
    try {
        const response = await axiosInstance.get("/auth/check");
        console.log("response from backend : ", response);
        dispatch(setAuthUser(response.data.data));
    } catch (error) {
        console.log("Error in checkAuth", error?.message);
        dispatch(setAuthUser(null))
    } finally {
        dispatch(setIsCheckingAuth(false));
    }
};

export const signup = (data) => async (dispatch) => {
    dispatch(setIsSigningUp(true));
    try {
        const response = await axiosInstance.post("/auth/signup", data);
        dispatch(setAuthUser(response.data.data));
        toast.success("account has been successfully created");
    } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
        console.log("Error in signing up (frontend) -> ", error?.message);
    } finally {
        dispatch(setIsSigningUp(false));
    }
};
