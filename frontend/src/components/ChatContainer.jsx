import { useDispatch, useSelector } from "react-redux";
import { getMessages, deleteMessage } from "../features/chatSlice.js";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { useEffect, useRef, useState } from "react";
import { formatMessageTime } from "../lib/formatTime.js";
import { Trash } from "lucide-react";

function ChatContainer() {
    const messages = useSelector((state) => state.chat.messages);
    const isMessageLoading = useSelector(
        (state) => state.chat.isMessageLoading
    );
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const longPressTimer = useRef(null);
    const authUser = useSelector((state) => state.auth.authUser);
    const selectedUser = useSelector((state) => state.chat.selectedUser);
    const dispatch = useDispatch();
    const messageEndRef = useRef(null);

    useEffect(() => {
        dispatch(getMessages(selectedUser._id));
    }, [selectedUser._id]);

    const handleRightClick = (e, id) => {
        console.log("right click is pressed");
        e.preventDefault();
        setSelectedMessageId((prevId) => (prevId === id ? null : id));
        setShowDeleteIcon(true);
    };

    const handleLongPressStart = (id) => {
        longPressTimer.current = setTimeout(() => {
            setSelectedMessageId(id);
            setShowDeleteIcon(true);
        }, 300); // 600ms press duration
    };

    const handleLongPressEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    const handleDelete = () => {
        dispatch(deleteMessage(selectedMessageId));
        setShowDeleteIcon(false);
        setSelectedMessageId(null);
    };

    if (isMessageLoading)
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        onContextMenu={(e) => handleRightClick(e, message._id)} // right click (desktop)
                        onTouchStart={() => handleLongPressStart(message._id)} // long press (mobile)
                        onTouchEnd={handleLongPressEnd}
                        className={`chat relative ${
                            message.sendersId === authUser._id
                                ? "chat-end"
                                : "chat-start"
                        }`}
                        ref={messageEndRef}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.sendersId === authUser._id
                                            ? authUser.profilePic ||
                                              "/avatar.png"
                                            : selectedUser.profilePic ||
                                              "avatar.png"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>

                        <div className="flex flex-col relative items-end">
                            {message.image && (
                                <div className="relative">
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="sm:max-w-[200px] rounded-md mb-2"
                                    />
                                    {message.sendersId === authUser._id &&
                                        showDeleteIcon &&
                                        message._id === selectedMessageId && (
                                            <button
                                                onClick={handleDelete}
                                                className="absolute -left-8 top-1/2 -translate-y-1/2 bg-base-300 p-2 rounded-full hover:bg-error hover:text-white transition shadow-md"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        )}
                                </div>
                            )}

                            {message.text && (
                                <div className="relative">
                                    <p className="chat-bubble max-w-[200px] sm:max-w-[400px]">
                                        {message.text}
                                    </p>
                                    {message.sendersId === authUser._id &&
                                        showDeleteIcon &&
                                        message._id === selectedMessageId && (
                                            <button
                                                onClick={handleDelete}
                                                className="absolute -left-10 top-1/2 -translate-y-1/2 bg-base-300 p-2 rounded-full hover:bg-error hover:text-white transition shadow-md"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    );
}

export default ChatContainer;
