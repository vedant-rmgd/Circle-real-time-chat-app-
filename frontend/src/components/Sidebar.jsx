import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, getUsers } from "../features/chatSlice.js";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";


function Sidebar() {
  const users = useSelector((state) => state.chat.users)
  const selectedUser = useSelector((state) => state.chat.selectedUser)
  const isUserLoading = useSelector((state) => state.chat.isUsersLoading)
  const onlineUsers = useSelector((state) => state.auth.onlineUsers)
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  },[])

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  if(isUserLoading) return <SidebarSkeleton/>

  return (
    <aside className={`h-full ${
    isExpanded ? "w-64" : "w-20"
    } border-r border-base-300 flex flex-col transition-all duration-300`}>
      <div className="border-b border-base-300 w-full p-4 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Users className="size-6 shrink-0" />
          <span
            className={`font-medium transition-opacity duration-200 ${
              isExpanded ? "opacity-100 ml-2" : "opacity-0 w-0"
            }`}
          >
            Contacts
          </span>
        </button>
        </div>
        
      <div
        className={`mt-3 px-4 flex-col gap-2 overflow-hidden transition-all duration-300 ${
          isExpanded ? "flex opacity-100" : "hidden opacity-0"
        }`}
      >
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">
          ({onlineUsers.length - 1} online)
        </span>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors px-3 py-2
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            {isExpanded && (
              <div className="text-left min-w-0 flex-1 overflow-hidden">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            )}
            
          </button>
        ))} 
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
      
    </aside>
  )
}

export default Sidebar