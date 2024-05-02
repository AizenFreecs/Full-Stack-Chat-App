import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo, useState } from "react";
import { Button } from "../ui/button";

function NotificationItem({ sender, _id, handler }) {
  const [isAcceptOrReject, setIsAcceptOrReject] = useState("");
  return (
    <>
      {isAcceptOrReject === "" ? (
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
              onClick={() => {
                handler({ _id, accept: true });
                setIsAcceptOrReject("accepted");
              }}
              className="md:w-[4rem] md:h-[2rem] text-green-500 hover:text-green-600 hover:scale-125 "
            >
              Accept
            </Button>
            <Button
              variant="link"
              onClick={() => {
                handler({ _id, accept: false });
                setIsAcceptOrReject("rejected");
              }}
              className="md:w-[4rem] md:h-[2rem] text-red-500 hover:text-red-600 hover:scale-125"
            >
              Reject
            </Button>
          </div>
        </div>
      ) : (
        <div className="my-4 p-1 text-md">
          <h1>{`The friend request from ${sender.name} has been ${isAcceptOrReject}`}</h1>
        </div>
      )}
    </>
  );
}

export default memo(NotificationItem);
