import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const initialState = {
    authUser: null, // info about authenticated user
    isCheckingAuth: true, // when ever user refreshes a page we will check if user is loggedin or not
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isRemovingProfilePic: false,
    onlineUsers: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
            console.log("auth user -> ", state.authUser);
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
        setIsRemovingProfilePic: (state, action) => {
            state.isRemovingProfilePic = action.payload;
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
    setIsRemovingProfilePic,
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
        dispatch(setAuthUser(null));
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

export const login = (data) => async (dispatch) => {
    dispatch(setIsLoggingIn(true));
    try {
        const response = await axiosInstance.post("/auth/login", data);
        dispatch(setAuthUser(response.data.data));
        toast.success("User is loggedin successfully");
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        console.log("Error in logging in (frontend) -> ", error?.message);
    } finally {
        dispatch(setIsLoggingIn(false));
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axiosInstance.post("/auth/logout");
        dispatch(logoutUser());
        toast.success("Logged out successfully");
    } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed");
    }
};

export const updateProfile = (data) => async (dispatch) => {
    dispatch(setIsUpdatingProfile(true));
    try {
        const response = await axiosInstance.put("/auth/update-profile", data);
        dispatch(setAuthUser(response.data.data));
        toast.success("Profile pic updated successfully");
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Failed to update profile pic"
        );
    } finally {
        dispatch(setIsUpdatingProfile(false));
    }
};

export const removeProfilePic = () => async (dispatch) => {
    dispatch(setIsRemovingProfilePic(true));
    try {
        const response = await axiosInstance.patch("/auth/remove-profile-pic");
        dispatch(setAuthUser(response.data.data));
        toast.success("Profile pic removed successfully");
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Failed to remove profile pic"
        );
    } finally {
        dispatch(setIsRemovingProfilePic(false));
    }
};
