import React, { useState } from "react";
import { Input } from "../ui/input";
import UserCard from "../shared/UserCard";
import { dummyUsers } from "@/constants/dummyData";
import { Button } from "../ui/button";
import { useAvailableFriendsQuery, useNewGroupMutation } from "@/redux/api/api";
import { useAsyncMutation, useErrors } from "@/hooks/hook";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoIosCamera } from "react-icons/io";

function NewGroups() {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [NewGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const navigate = useNavigate();
  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMembersHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName) {
      return toast.error("Please enter group name");
    }
    if (selectedMembers.length < 2) {
      return toast.error("Please select atleast 3 members");
    }

    NewGroup("Creating new group ...", {
      name: groupName,
      members: selectedMembers,
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="bg-gradient-to-r from-emerald-500 to-fuchsia-600 bg-clip-text text-transparent text-2xl font-bold">New Group</h1>

      <div className="flex flex-col w-full items-center gap-2 md:px-[2rem]">
        <Input
          value={groupName}
          placeholder="Enter Group name"
          className="w-full"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <h1 className="text-xl bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">Select Members</h1>
      <div className=" w-full overflow-y-auto max-h-[50vh]">
        {isLoading ? (
          <Skeleton />
        ) : (
          data?.friends?.map((item) => (
            <UserCard
              _id={item._id}
              key={item._id}
              name={item.name}
              avatar={item.avatar}
              handler={selectMembersHandler}
              isAdded={selectedMembers.includes(item._id)}
            />
          ))
        )}
      </div>
      <Button
        className="bg-green-500 hover:bg-green-600 w-[6rem] mt-4"
        onClick={submitHandler}
        disabled={isLoadingNewGroup}
      >
        Create
      </Button>
    </div>
  );
}

export default NewGroups;
