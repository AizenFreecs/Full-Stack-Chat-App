import React, { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Button } from "../ui/button";

function NotificationItem({ sender, _id, handler }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 mx-4 ">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={sender.avatar} />
          <AvatarFallback>Image not Found</AvatarFallback>
        </Avatar>
        <h1 className="text-sm overflow-hidden overflow-ellipsis">{`${sender.name} sent you a friend request`}</h1>
      </div>
      <div className="flex gap-2">
        <Button
          variant="link"
          onClick={() => handler({ _id, accept: true })}
          className="md:w-[4rem] md:h-[2rem] text-green-500 hover:text-green-600 hover:scale-125 "
        >
          Accept
        </Button>
        <Button
          variant="link"
          onClick={() => handler({ _id, accept: true })}
          className="md:w-[4rem] md:h-[2rem] text-red-500 hover:text-red-600 hover:scale-125"
        >
          Reject
        </Button>
      </div>
    </div>
  );
}

export default memo(NotificationItem);
