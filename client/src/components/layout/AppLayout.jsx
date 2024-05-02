import { useState } from "react";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "@/constants/events";
import { useErrors, useSocketEvents } from "@/hooks/hook";
import { getOrSaveFromStorage } from "@/lib/features";
import { useMyChatsQuery } from "@/redux/api/api";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "@/redux/reducers/chat";
import { setSelectedDeleteChat } from "@/redux/reducers/misc";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../../../Socket";
import ChatList from "../features/ChatList";
import { Skeleton } from "../ui/skeleton";
import Header from "./Header";


const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const socket = getSocket();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { uploadingLoader } = useSelector((state) => state.misc);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { newMessagesAlert, notificationCount } = useSelector(
      (state) => state.chat
    );

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
      getOrSaveFromStorage({
        key: "notificationCount",
        value: notificationCount,
      });
    }, [newMessagesAlert, notificationCount]);

    const handleDeleteChat = (e, _id, groupChat) => {
      dispatch(setSelectedDeleteChat({ chatId: _id, groupChat }));
      console.log("Chat Deleted", _id, groupChat);
    };

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };
    useSocketEvents(socket, eventHandlers);
    return (
      <div>
        <Header handleDeleteChat={handleDeleteChat} newMessagesAlert={newMessagesAlert} onlineUsers={onlineUsers} />

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
                onlineUsers={onlineUsers}
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
