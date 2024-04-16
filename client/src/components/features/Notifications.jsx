import React, { useState } from "react";
import { dummyNotifications } from "@/constants/dummyData";
import NotificationItem from "./NotificationItem";
function Notifications() {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const friendRequestHandler = (_id,accept)=>{}
  return (
    <section className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl">---------- Notifications ----------</h1>
      </div>
      <div>
        {notifications.length > 0 ? (
          notifications.map((item) => <NotificationItem key={item._id} sender={item.sender} _id={item._id} handler={friendRequestHandler}/>)
        ) : (
          <h1 className="text-center text-sm text-red-400">
            No new notifications.
          </h1>
        )}
      </div>
    </section>
  );
}

export default Notifications;
