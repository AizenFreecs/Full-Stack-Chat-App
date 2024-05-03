import { useAsyncMutation, useErrors } from "@/hooks/hook";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "@/redux/api/api";
import { Separator } from "@radix-ui/react-separator";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdAdd, MdDone, MdEdit } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../layout/Loaders";
import UserCard from "../shared/UserCard";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import GroupList from "./GroupList";

function Groups() {
  const chatId = useSearchParams()[0].get("group");
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isEditGroupName, setIsEditGroupName] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const myGroups = useMyGroupsQuery();
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  const [members, setMembers] = useState([]);
  const [renameGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );
  const [removeGroupMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup] = useAsyncMutation(useDeleteChatMutation);

  const errors = [
    { isError: myGroups.isError, error: myGroups.error },
    { isError: groupDetails.isError, error: groupDetails.error },
  ];
  useErrors(errors);

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }
    return () => {
      setMembers([]);
      setGroupName("");
      setIsEditGroupName(false);
    };
  }, [groupDetails.data]);

  const onGroupSelectHandler = (name) => {
    setIsGroupOpen(true);
    setGroupName((prev) => name);
  };

  const updateGroupNameHandler = () => {
    setIsEditGroupName(false);
    renameGroup("Updating the group name . . .", {
      chatId,
      name: newGroupName,
    });
  };

  const confirmDeleteHandler = () => {
    deleteGroup("Deleting the group . . . ", chatId);
    setConfirmDeleteOpen(false);
    setIsGroupOpen(false);
    navigate("/");
  };

  const removeMemberHandler = (id) => {
    removeGroupMember("Removing members . . . ", { chatId, userId: id });
  };
  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <div className="grid grid-cols-3">
      <div
        className={`flex flex-col md:col-span-1 col-span-3  ${
          isGroupOpen ? "hidden sm:block" : "block sm:hidden"
        } md:block p-2 rounded-md`}
      >
        <h1 className="mb-2 bg-gradient-to-r from-emerald-400 to-fuchsia-600 bg-clip-text text-transparent text-center text-xl">
          My Groups
        </h1>
        <div>
          <GroupList
            myGroups={myGroups?.data?.groups}
            chatId={chatId}
            handler={onGroupSelectHandler}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        whileInView={{ opacity: 1, x: 0 }}
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
                <Input
                  placeholder="Enter group name"
                  ref={inputRef}
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
                <MdDone
                  className="cursor-pointer h-[1.5rem] w-[1.5rem]"
                  onClick={updateGroupNameHandler}
                  disabled={isLoadingGroupName}
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
          <div className="max-h-[35vh] md:max-h-[47vh] overflow-y-auto">
            {isLoadingRemoveMember ? (
              <Skeleton />
            ) : (
              members.map((item) => (
                <UserCard
                  _id={item._id}
                  key={item._id}
                  name={item.name}
                  avatar={item.avatar}
                  isAdded
                  handler={removeMemberHandler}
                  className=" border rounded-lg mb-2 border-black"
                />
              ))
            )}
          </div>
        </div>
        <div className="flex items-center justify-around mt-5">
          <Dialog
            open={isConfirmDeleteOpen}
            onOpenChange={setConfirmDeleteOpen}
          >
            <DialogTrigger>
              <div className="p-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-500">
                <h1>Delete Group</h1>
              </div>
            </DialogTrigger>
            <DialogContent className="w-[85vw] rounded-lg">
              <ConfirmDelete
                confirmDeleteHandler={confirmDeleteHandler}
                openCloseHandler={setConfirmDeleteOpen}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <div className="flex items-center gap-1 text-green-500 text-sm p-1 rounded-md">
                <h1>Add Members</h1>
                <MdAdd className="mx-2 h-[1.5rem] w-[1.5rem]" />
              </div>
            </DialogTrigger>
            <DialogContent className="md:w-[400px] w-[80vw] ">
              <AddMembers openCloseHandler={setIsOpen} chatId={chatId} />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </div>
  );
}

const ConfirmDelete = ({ confirmDeleteHandler, openCloseHandler }) => {
  const handleRejectDeleteHandler = () => {
    openCloseHandler(false);
    console.log("Delete Cancelled");
  };
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <h2>Are you sure you want to delete the group permanently ?</h2>
      <div className="flex items-center gap-4">
        <Button
          variant="link"
          className=" text-red-500 text-lg"
          onClick={confirmDeleteHandler}
        >
          Yes
        </Button>
        <Button
          variant="link"
          className="text-green-500 text-lg"
          onClick={handleRejectDeleteHandler}
        >
          No
        </Button>
      </div>
    </div>
  );
};

const AddMembers = ({ chatId = "temp", openCloseHandler }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [addGroupMember, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const selectMembersHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const confirmAddFriendHandler = () => {
    addGroupMember("Group Updated", {
      chatId,
      members: selectedMembers,
    });
    openCloseHandler(false);
  };

  useErrors([{ isError, error }]);
  return (
    <div className="flex flex-col item-center ">
      <h1 className="text-center text-xl mb-4">Add Members</h1>
      <div className=" max-h-[50vh] overflow-y-auto">
        {isLoading ? (
          <Skeleton />
        ) : data?.friends?.length > 0 ? (
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
        ) : (
          <h1>No selectable friends</h1>
        )}
      </div>
      <Button
        className="mt-5 bg-blue-500 hover:bg-blue-600"
        onClick={confirmAddFriendHandler}
      >
        Add Friends
      </Button>
    </div>
  );
};
export default Groups;
