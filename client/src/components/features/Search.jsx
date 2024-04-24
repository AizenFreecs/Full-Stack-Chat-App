import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import UserCard from "../shared/UserCard";
import { dummyUsers } from "@/constants/dummyData";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "@/redux/api/api";
import toast from "react-hot-toast";
import { useAsyncMutation } from "@/hooks/hook";

function Search() {
  const [searchUser] = useLazySearchUserQuery();
  const [search, setSearch] = useState("");
  
  const [sendFriendRequest,isSendFriendRequestLoading] = useAsyncMutation(useSendFriendRequestMutation);

 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const timeOutid = setTimeout(() => {
      console.log("Search value", search);
      searchUser(search)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err));
    }, 600);
    return () => clearTimeout(timeOutid);
  }, [search]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request", {userId: id})
  };

  return (
    <section>
      <div className="text-xl text-center flex flex-col items-center gap-2">
        <h1>Find More People</h1>
        <div className="flex gap-2 items-center border border-gray-500 rounded-md p-2 w-full">
          <CiSearch className="h-[1.5rem] w-[1.5rem]" />
          <Input
            className="focus-visible:ring-transparent border-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
