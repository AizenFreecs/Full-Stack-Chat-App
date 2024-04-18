import moment from "moment";
import React from "react";
const userMessage = "self-end bg-green-200";
const friendMessage = "self-start bg-blue-200";
import { fileFormatChecker } from "@/lib/features";
import ShowAttachement from "./ShowAttachement";

function MessageComponent({ message, user }) {
  const { sender, content, attachements = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const messageRecievedTime = moment(createdAt).fromNow();
  
  return (
    <div
      className={` ${
        sameSender ? userMessage : friendMessage
      } rounded-md p-2 w-fit`}
    >
      {!sameSender && <h1 className=" text-cyan-600 text-md">{sender.name}</h1>}
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
    </div>
  );
}

export default MessageComponent;
