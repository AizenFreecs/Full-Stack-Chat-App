import { useInfiniteScrollTop } from "6pp";
import FileMenu from "@/components/features/FileMenu";
import AppLayout from "@/components/layout/AppLayout";
import { TypingLoader } from "@/components/layout/Loaders";
import MessageComponent from "@/components/shared/MessageComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEFT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "@/constants/events";
import { useErrors, useSocketEvents } from "@/hooks/hook";
import { useChatDetailsQuery, useGetOldMessagesQuery } from "@/redux/api/api";
import { removeNewMessagesAlert } from "@/redux/reducers/chat";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../../Socket";

function Chat() {
  const params = useParams();
  const chatId = params.chatId;
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetOldMessagesQuery({ chatId, page });
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails.data?.chat?.members;

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const messageOnChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEFT, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // emmiting message to the server
    socket.emit("NEW_MESSAGE", { chatId, members, message });
    setMessage("");
  };
  const newMessageListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
    
      if (data.chatId !== chatId) return;

      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "YehhaiekrandomID",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandlers = {
    [NEW_MESSAGE]: newMessageListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [ALERT]: alertListener,
  };

  useSocketEvents(socket, eventHandlers);

  useErrors(errors);
  const allMessages = [...oldMessages, ...messages];
  return (
    <main className="w-full h-full max-h-[calc(100vh-4rem)] bg-transparent mr-2 ">
      <div
        ref={containerRef}
        className="w-full h-[90%] max-h-[90%] flex flex-col item-center p-[1rem] rounded-xl bg-gradient-to-tl from-indigo-300 via-slate-300 to-sky-300 overflow-x-hidden overflow-y-auto"
      >
        {allMessages.map((item) => (
          <MessageComponent message={item} user={user} key={item._id} />
        ))}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </div>
      <form
        className="h-[10%] w-full  flex items-center py-2 gap-4"
        onSubmit={submitHandler}
      >
        <div className="flex w-full h-full items-center rounded-lg bg-gradient-to-r from-gray-200 via-slate-50 to-gray-200 border-2 border-gray-400 ">
          <FileMenu chatId={chatId} />
          <Input
            placeholder="Type your Message"
            className=" w-full mr-2 focus-visible:ring-transparent border-none"
            value={message}
            onChange={messageOnChangeHandler}
          />
          <Button variant="empty" className="hover:text-red-500 " type="submit">
            <IoSend className="mx-2 h-[1.5rem] w-[1.5rem] cursor-pointer" />
          </Button>
        </div>
      </form>
    </main>
  );
}

export default AppLayout()(Chat);
