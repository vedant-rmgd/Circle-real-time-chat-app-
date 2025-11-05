import { useDispatch, useSelector } from "react-redux";
import {getMessages} from "../features/chatSlice.js";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { useEffect } from "react";

function ChatContainer() {
    const messages = useSelector((state) => state.chat.messages);
    const isMessageLoading = useSelector(
        (state) => state.chat.isMessageLoading
    );
    const selectedUser = useSelector((state) => state.chat.selectedUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessages(selectedUser._id));
    }, [selectedUser._id]);

    if (isMessageLoading) return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader/>
        <MessageSkeleton/>
        <MessageInput/>
      </div>
    )

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <MessageInput />
        </div>
    );
}

export default ChatContainer;
