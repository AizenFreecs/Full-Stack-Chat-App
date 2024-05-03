import moment from "moment";
import React from "react";
const userMessage = "self-end bg-gradient-to-tl  from-cyan-300 to-green-200 shadow-xl";
const friendMessage = "self-start bg-gradient-to-r from-purple-300 to-neutral-300 shadow-xl";
import { fileFormatChecker } from "@/lib/features";
import ShowAttachement from "./ShowAttachement";
import { motion } from "framer-motion";

function MessageComponent({ message, user }) {
  const { sender, content, attachements = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const messageRecievedTime = moment(createdAt).fromNow();
  console.log(message.sender.id,user._id)
 

  return (
    <motion.div
      className={` ${
        sameSender ? userMessage : friendMessage
        } rounded-md p-2 w-fit mt-1`}
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{opacity:1,x:0}}
    >
      {!sameSender && <h1 className=" bg-gradient-to-r from-blue-500 to-fuchsia-500 bg-clip-text text-transparent font-bold text-md">{sender.name}</h1>}
      {content && <p className="text-sm py-1">{content}</p>}
      {attachements.length > 0 &&
        attachements.map((item, index) => {
          const url = item.url;
          const fileType = fileFormatChecker(url);

          return (
            <div key={index}>
              <a href={url} target="_blank" download className="text-black">
                <ShowAttachement url={url} file={fileType} />
              </a>
            </div>
          );
        })}
      <p className=" text-xs text-gray-700 ">{messageRecievedTime}</p>
    </motion.div>
  );
}

export default MessageComponent;
