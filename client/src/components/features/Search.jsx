import React, { useState } from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import UserCard from "../shared/UserCard";
import { dummyUsers } from "@/constants/dummyData";

function Search() {
  const addFriendHandler = (id) => {
    console.log(id)
   };
  const isSendFriendRequestLoading = false
  const [users,setUsers] = useState(dummyUsers)
  return (
    <section>
      <div className="text-xl text-center flex flex-col items-center gap-2">
        <h1>Find More People</h1>
        <div className="flex gap-2 items-center border border-gray-500 rounded-md p-2 w-full">
          <CiSearch className="h-[1.5rem] w-[1.5rem]" />
          <Input className="focus-visible:ring-transparent border-none" />
        </div>
      </div>
      <div className="py-4 overflow-y-auto max-h-[60vh] my-4">
        {users.map((item) => (
          <UserCard
            _id={item._id}
            key={item._id}
            name={item.name}
            avatar={item.avatar}
            handler={addFriendHandler}
            handlerIsLoading={isSendFriendRequestLoading}
          />
        ))}
      </div>
    </section>
  );
}

export default Search;
