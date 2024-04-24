import FileMenu from "@/components/features/FileMenu";
import AppLayout from "@/components/layout/AppLayout";
import MessageComponent from "@/components/shared/MessageComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyMessage } from "@/constants/dummyData";
import { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { getSocket } from "../../Socket";
import { NEW_MESSAGE } from "@/constants/events";
import { useChatDetailsQuery } from "@/redux/api/api";
const user = {
  _id: "bfubfef",
  name: "Bamlaue",
};
function Chat({ chatId}) {
  const socket = getSocket();
  const [message, setMessage] = useState("");

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
 const members = chatDetails.data?.chat?.members
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // emmiting message to the server
    socket.emit("NEW_MESSAGE", { chatId, members, message });
    setMessage("");
  };

  const containerRef = useRef(null);
  return chatDetails.isLoading ? <><h1>Loading</h1></> : (
    <main className="w-full h-full bg-white">
      <div
        ref={containerRef}
        className="w-full h-[90%] flex flex-col item-center p-[1rem] bg-slate-300 overflow-x-hidden overflow-y-auto"
      >
        {dummyMessage.map((item) => (
          <MessageComponent message={item} user={user} key={item.id} />
        ))}
      </div>
      <form
        className="h-[10%] w-full flex items-center p-1 gap-4"
        onSubmit={submitHandler}
      >
        <div className="flex w-full h-full items-center md:p-2 ">
          <FileMenu />
          <Input
            placeholder="Type your Message"
            className=" w-full mr-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
