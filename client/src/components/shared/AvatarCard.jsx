import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { transformImage } from "@/lib/features";
function AvatarCard({ groupChat = false, avatar = [] }) {
  return (
    <>
      {groupChat ? (
        <div className="flex">
          <Avatar className="relative">
            <AvatarImage
              src={transformImage(avatar[0])}
              className="rounded-full bg-white w-12 h-12 border-2 border-white"
            />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
          <Avatar className="relative -ml-5">
            <AvatarImage
              src={transformImage(avatar[1])}
              className="rounded-full bg-white w-12 h-12 border-2 border-white"
            />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
          <Avatar className="relative -ml-5">
            <AvatarImage
              src={transformImage(avatar[2])}
              className="rounded-full bg-white w-12 h-12 border-2 border-white"
            />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="p-1 bg-gray-500 rounded-full">
          <Avatar className="">
            <AvatarImage src={transformImage(avatar)} className="bg-white" />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
        </div>
      )}
    </>
  );
}

export default AvatarCard;
