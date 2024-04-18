import { Separator } from "@radix-ui/react-separator";
import React, { useState, useRef } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "../ui/button";
import { dummyChats } from "@/constants/dummyData";
import GroupList from "./GroupList";
import { useSearchParams } from "react-router-dom";
import { MdEdit, MdDone, MdAdd } from "react-icons/md";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

function Groups() {
  const chatId = useSearchParams()[0].get("group");
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isEditGroupName, setIsEditGroupName] = useState(false);
  const [groupName, setGroupName] = useState("");
  const inputRef = useRef();
  console.log(chatId);
  const onGroupSelectHandler = (name) => {
    setIsGroupOpen(true);
    setGroupName((prev) => name);
    console.log(groupName);
  };

  const confirmDeleteHandler = () => {
    console.log("Deleted");
  };

  const openAddMemberHandler = () => {};
  return (
    <div className="grid grid-cols-3">
      <div
        className={`flex flex-col md:col-span-1 col-span-3  ${
          isGroupOpen ? "hidden sm:block" : "block sm:hidden"
        } md:block p-2 rounded-md`}
      >
        <h1>My Groups</h1>
        <div>
          <GroupList
            myGroups={dummyChats}
            chatId={chatId}
            handler={onGroupSelectHandler}
          />
        </div>
      </div>
      <div
        className={`${isGroupOpen ? "block" : "hidden"} sm:${
          isGroupOpen ? "block" : "hidden"
        } col-span-3 md:col-span-2 p-2`}
      >
        <div className="flex items-center justify-between w-full mt-4">
          <IoMdArrowRoundBack
            onClick={() => setIsGroupOpen((prev) => !prev)}
            className="cursor-pointer w-[1.5em] h-[1.5rem]"
          />
          <div className="p-1 flex items-center gap-2">
            {isEditGroupName ? (
              <div className="flex items-center gap-2">
                <Input placeholder="Enter group name" ref={inputRef} />
                <MdDone
                  className="cursor-pointer h-[1.5rem] w-[1.5rem]"
                  onClick={() => {
                    setGroupName(inputRef.current.value);
                    setIsEditGroupName(false);
                  }}
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl">{groupName}</h1>
                <MdEdit
                  className="cursor-pointer h-[1.5rem] w-[1.5rem]"
                  onClick={() => setIsEditGroupName(true)}
                />
              </>
            )}
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col items-center gap-4">
          <h1>Members</h1>
          {"Members list will appear here"}
        </div>
        <div className="flex items-center justify-around mt-5">
          <Dialog>
            <DialogTrigger>
              <div className="p-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-500">
                <h1>Confirm Delete</h1>
              </div>
            </DialogTrigger>
            <DialogContent className="w-[85vw] rounded-lg">
              <ConfirmDelete />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <div className="flex items-center gap-1 text-green-500 text-sm p-1 rounded-md">
                <h1>Add Members</h1>
                <MdAdd className="mx-2 h-[1.5rem] w-[1.5rem]" />
              </div>
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

const ConfirmDelete = () => {
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <h2>Are you sure you want to delete the group permanently ?</h2>
      <div className="flex items-center gap-4">
        <Button variant="link" className="text-green-500 text-lg">
          Yes
        </Button>
        <Button variant="link" className="text-red-500 text-lg">
          No
        </Button>
      </div>
    </div>
  );
};
export default Groups;
