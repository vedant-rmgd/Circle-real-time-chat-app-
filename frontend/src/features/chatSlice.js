import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const initialState = {
    messages: [],
    users: [],
    onlineUsers : [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessages: (state, action) => {
            state.messages.push(action.payload);
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setIsUsersLoading: (state, action) => {
            state.isUsersLoading = action.payload;
        },
        setIsMessageLoading: (state, action) => {
            state.isMessageLoading = action.payload;
        },
    },
});

export const {
    setUsers,
    setMessages,
    addMessages,
    setSelectedUser,
    setIsUsersLoading,
    setIsMessageLoading,
} = chatSlice.actions;
export default chatSlice.reducer;

export const getUsers = () => async (dispatch) => {
    dispatch(setIsUsersLoading(true));
    try {
        const response = await axiosInstance.get("/message/get-users");
        dispatch(setUsers(response.data.data));
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch users");
        console.log("Error in featching users -> ", error?.message);
    } finally {
        dispatch(setIsUsersLoading(false));
    }
};

export const getMessages = (userId) => async (dispatch) => {
    dispatch(setIsMessageLoading(true));
    try {
        const response = await axiosInstance.get(
            `/message/get-message/${userId}`
        );
        dispatch(setMessages(response.data.data));
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Failed to fetch messages"
        );
    } finally {
        dispatch(setIsMessageLoading(false));
    }
};

export const sendMessage = (selectedUserId, messageData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(
            `/message/send-message/${selectedUserId}`,
            messageData
        );
        dispatch(addMessages(response.data.data));
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Failed to send message"
        );
    }
};
