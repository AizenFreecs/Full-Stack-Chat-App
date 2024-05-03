import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { transformImage } from "@/lib/features";
import { motion } from "framer-motion";
import AvatarCard from "./AvatarCard";

const sameSenderCss = "bg-gradient-to-r from-teal-300 to-green-500 shadow-xl text-white hover:bg-green-500"

function ChatItem({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) {

  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        className={`items-center p-[1rem] gap-[1rem] ${
          sameSender ? sameSenderCss : ""
        }  relative rounded-xl mx-2 mt-2 ${sameSender ? "":"hover:bg-gradient-to-r from-gray-300 to-stone-500"} `}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 p-1 rounded-full">
            <AvatarCard avatar={avatar} groupChat={groupChat} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {name}
              {isOnline && (
                <div className="h-2 w-2 -mt-2 rounded-full bg-green-400"></div>
              )}
            </div>
            {newMessageAlert && <h2>{newMessageAlert.count} New Message</h2>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ChatItem);
