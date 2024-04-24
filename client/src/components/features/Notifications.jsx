import React, { useState } from "react";
import { dummyNotifications } from "@/constants/dummyData";
import NotificationItem from "./NotificationItem";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "@/redux/api/api";
import { useErrors } from "@/hooks/hook";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Notifications() {
  const navigate = useNavigate();
  const { isloading, data, error, isError } = useGetNotificationsQuery();

  console.log(data);
  const [acceptRequest] = useAcceptFriendRequestMutation();
  const friendRequestHandler = async ({ _id, accept }) => {
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      console.log(res);
      if (res.data?.success) {
        console.log(res.data.message);
        toast.success(res.data.message || "Friend request accepted");
        navigate(`/chat/${res.data.senderId}`);
      } else {
        toast.error("Something went wrong");
        console.log(error);
      }
    } catch (error) {}
  };
  useErrors([{ isError, error }]);
  return (
    <section className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="text-xl"> Notifications</h1>
        <Separator className=" bg-gray-400 w-2/3" />
      </div>
      <div>
        {isloading ? (
          <h1>Loading</h1>
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map((item) => (
                <NotificationItem
                  key={item._id}
                  sender={item.sender}
                  _id={item._id}
                  handler={friendRequestHandler}
                />
              ))
            ) : (
              <h1 className="text-center text-sm text-red-400">
                No new notifications.
              </h1>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Notifications;
