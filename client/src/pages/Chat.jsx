import FileMenu from "@/components/features/FileMenu";
import AppLayout from "@/components/layout/AppLayout";
import MessageComponent from "@/components/shared/MessageComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyMessage } from "@/constants/dummyData";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { getSocket } from "../../Socket";
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "@/constants/events";
import { useChatDetailsQuery, useGetOldMessagesQuery } from "@/redux/api/api";
import { useErrors, useSocketEvents } from "@/hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScrollTop } from "6pp";
import { removeNewMessagesAlert } from "@/redux/reducers/chat";
import { TypingLoader } from "@/components/layout/Loaders";

function Chat({ chatId }) {
  const socket = getSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const bottomRef = useRef(null);

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

  const messageOnChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true)
    }
    if(typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId })
      setIamTyping(false)
    },[2000])
  };

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  useEffect(() => {
    if(bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages])
  

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
      console.log(data, chatId);
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      console.log(data);
      if (data.chatId !== chatId) return;
      console.log("Start Typing", data);
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      console.log(data);
      if (data.chatId !== chatId) return;
      console.log("Stop Typing", data);
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      const messageForAlert = {
        content,
        sender: {
          _id: "YehhaiekrandomID",
          name:"Admin"
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, messageForAlert])
    },
    [chatId]
  );



  const eventHandlers = {
    [NEW_MESSAGE]: newMessageListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
    [ALERT]:alertListener
  };

  useSocketEvents(socket, eventHandlers);

  const containerRef = useRef(null);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  useErrors(errors);
  const allMessages = [...oldMessages, ...messages];
  return chatDetails.isLoading ? (
    <>
      <h1>Loading</h1>
    </>
  ) : (
    <main className="w-full h-full max-h-[calc(100vh-4rem)] bg-white ">
      <div
        ref={containerRef}
        className="w-full h-[90%] max-h-[90%] flex flex-col item-center p-[1rem] bg-slate-300 overflow-x-hidden overflow-y-auto"
      >
        {allMessages.map((item) => (
          <MessageComponent message={item} user={user} key={item._id} />
        ))}
          
          {
            userTyping && <TypingLoader />
          }
          <div ref={bottomRef} />
      </div>
      <form
        className="h-[10%] w-full flex items-center p-2 px-4 gap-4"
        onSubmit={submitHandler}
      >
        <div className="flex w-full h-full items-center rounded-lg border-2 border-gray-400 ">
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
