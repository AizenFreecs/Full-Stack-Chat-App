import React from "react";
import Header from "./Header";
import ChatList from "../features/ChatList";
import ChatItem from "../shared/ChatItem";
import { dummyChats } from "@/constants/dummyData";
import { useParams } from "react-router-dom";
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Chat Deleted", _id, groupChat);
    };
    return (
      <div>
        <Header />
        <div className="grid grid-cols-5 h-[calc(100vh-4rem)]">
          <div className="col-span-1  hidden sm:block  bg-gray-200">
            <ChatList
              chats={dummyChats}
              chatId={chatId}
              newMessagesAlert={[
                {
                  chatId,
                  count: 4,
                },
              ]}
              handleDeleteChat={handleDeleteChat}
            />
          </div>
          <div className="col-span-5 sm:col-span-4 md:col-span-4  bg-gray-300">
            <WrappedComponent {...props} />
          </div>
          
        </div>
      </div>
    );
  };
};

export default AppLayout;
