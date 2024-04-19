import React, { useState } from "react";
import { Input } from "../ui/input";
import UserCard from "../shared/UserCard";
import { dummyUsers } from "@/constants/dummyData";
import { Button } from "../ui/button";
function NewGroups() {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupName, setGroupName] = useState();
  

  const selectMembersHandler = (id) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((item)=> item !== id) : [...prev, id]));
  };
  console.log(selectedMembers);
  const submitHandler = () => {};

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col w-full items-center gap-2 md:px-[2rem]">
        <h1 className=" titleText">New Group</h1>
        <Input
          value={groupName}
          placeholder="Enter Group name"
          className="w-full"
        />
      </div>
      <h1 className="text-xl">Select Members</h1>
      <div className=" w-full overflow-y-auto max-h-[50vh]">
        {users.map((item) => (
          <UserCard
            _id={item._id}
            key={item._id}
            name={item.name}
            avatar={item.avatar}
            handler={selectMembersHandler}
            isAdded={selectedMembers.includes(item._id)}
          />
        ))}
      </div>
      <Button
        className="bg-green-500 hover:bg-green-600 w-[6rem] mt-4"
        onClick={submitHandler}
      >
        Create
      </Button>
    </div>
  );
}

export default NewGroups;
