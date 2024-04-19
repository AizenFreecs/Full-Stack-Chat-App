import React, { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HiOutlineUserAdd, HiOutlineUserRemove } from "react-icons/hi";
import { Button } from "../ui/button";
import { transformImage } from "@/lib/features";

function UserCard({
  _id,
  name,
  avatar,
  handler,
  handlerIsLoading,
  isAdded = false,
  className=""
}) {
  return (
    <div className={`flex items-center justify-between gap-4 px-4 py-2 mx-4 ${className}`}>
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={transformImage(avatar)} />
          <AvatarFallback>Image not Found</AvatarFallback>
        </Avatar>
        <h1 className="text-xl overflow-hidden overflow-ellipsis">{name}</h1>
      </div>
      <Button
        onClick={() => handler(_id)}
        disabled={handlerIsLoading}
        variant="empty"
        className="hover:scale-125"
      >
        {isAdded ? (
          <HiOutlineUserRemove className="h-[1.5rem] w-[1.5rem] text-red-600  cursor-pointer" />
        ) : (
          <HiOutlineUserAdd className="h-[1.5rem] w-[1.5rem] text-blue-600  cursor-pointer" />
        )}
      </Button>
    </div>
  );
}

export default memo(UserCard);
