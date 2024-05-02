import React, { useEffect } from "react";
import ChatItem from "../shared/ChatItem";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useSelector } from "react-redux";
import { AiOutlineUserDelete,AiOutlineUsergroupDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "@/hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "@/redux/api/api";

function ChatList({
  width = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) {
  const navigate = useNavigate()
  const { selectedDeleteChat } = useSelector((state) => state.misc);


  const [deleteChat,isLoadingDeleteChat,deleteChatData] = useAsyncMutation(useDeleteChatMutation)
const [leaveGroup,_,leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)
  const leaveGroupHandler = () => {

    leaveGroup("Leaving Group", selectedDeleteChat.chatId)
    console.log(selectedDeleteChat.chatId)
  };
  const deleteChatHandler = () => {
    deleteChat("Deleting Chat",selectedDeleteChat.chatId)
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) {
      navigate("/")
    }
  },[deleteChatData,leaveGroupData])

  return (
    <div className={`w-${width} flex flex-col overflow-y-auto `}>
      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;
       
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );
        const isOnline = members?.some((member) => onlineUsers.includes(member));
        return (
          <ContextMenu key={_id}>
            <ContextMenuTrigger>
              <ChatItem
                index={index}
                newMessageAlert={newMessageAlert}
                isOnline={isOnline}
                avatar={avatar}
                _id={_id}
                name={name}
                groupChat={groupChat}
                sameSender={chatId === _id}
                handleDeleteChat={handleDeleteChat}
              />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onClick={selectedDeleteChat.groupChat ? leaveGroupHandler : deleteChatHandler}
              >
                <div className="text-red-500 hover:text-red-600 cursor-pointer font-bold">
                  {selectedDeleteChat.groupChat
                    ? <div className="flex gap-2 items-center"><AiOutlineUsergroupDelete className="h-[1.5rem] w-[1.5rem]" />  {"Leave Group"}</div>
                    : <div className="flex gap-2 items-center"><AiOutlineUserDelete className="h-[1.5rem] w-[1.5rem]" />  {"Delete Chat"}</div>}
                </div>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        );
      })}
    </div>
  );
}

export default ChatList;
