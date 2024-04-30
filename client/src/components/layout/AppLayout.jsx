import React, { useCallback, useEffect } from "react";
import Header from "./Header";
import ChatList from "../features/ChatList";
import ChatItem from "../shared/ChatItem";
import { dummyChats } from "@/constants/dummyData";
import { useNavigate, useParams } from "react-router-dom";
import { useMyChatsQuery } from "@/redux/api/api";
import { Skeleton } from "../ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useErrors } from "@/hooks/hook";
import { getSocket } from "../../../Socket";
import { useSocketEvents } from "@/hooks/hook";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "@/redux/reducers/chat";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from "@/constants/events";
import { getOrSaveFromStorage } from "@/lib/features";
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const socket = getSocket();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { uploadingLoader } = useSelector((state) => state.misc);
    const { newMessagesAlert } = useSelector((state) => state.chat);
    
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessagesAlert})
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, _id, groupChat) => {
      
      e.preventDefault();
      console.log("Chat Deleted", _id, groupChat);
    };

    const newMessageAlertListener = useCallback((data) => {
      if(data.chatId === chatId) return
      dispatch(setNewMessagesAlert(data));
    }, [chatId]);

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/")
      
    }, [refetch,navigate]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]:refetchListener,
    };
    useSocketEvents(socket, eventHandlers);
    return (
      <div>
        <Header />
        <div className="grid grid-cols-5 h-[calc(100vh-4rem)]">
          <div className="col-span-1  hidden sm:block  bg-gray-200">
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data.chats}
                chatId={chatId}
                newMessagesAlert={newMessagesAlert}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </div>
          <div className="col-span-5 sm:col-span-4 md:col-span-4  bg-gray-300">
            <WrappedComponent {...props} chatId={chatId} />
          </div>
        </div>
      </div>
    );
  };
};

export default AppLayout;
