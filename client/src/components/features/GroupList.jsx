import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { transformImage } from "@/lib/features";

function GroupList({ myGroups = [], chatId, handler }) {
  return (
    <div className="flex flex-col gap-4" >
      {myGroups.length > 0 ? (
        myGroups.map((item) => (
          <GroupListItems group={item} chatId={chatId} key={item._id} handler={handler} />
        ))
      ) : (
        <h1 className="text-center p-4">You have not joined any Groups.</h1>
      )}
    </div>
  );
}

const GroupListItems = memo(({ group, chatId, handler }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
          if (chatId === _id) e.preventDefault()
          handler(name)
      }}
    >
      <div className="flex my-2 items-center gap-4" >
        <Avatar>
          <AvatarImage src={transformImage(avatar.url)} />
          <AvatarFallback>NF</AvatarFallback>
        </Avatar>
        <h1>{name}</h1>
      </div>
    </Link>
  );
});
export default GroupList;
