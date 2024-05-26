import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMyChatsQuery } from "@/redux/api/api";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiCirclePlus, CiMenuBurger } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import Groups from "../features/Groups";
import NewGroups from "../features/NewGroups";
import Notifications from "../features/Notifications";
import { useParams } from "react-router-dom";
import Search from "../features/Search";
import ProfileCard from "../shared/ProfileCard";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import ChatList from "../features/ChatList";
import { useDispatch, useSelector } from "react-redux";
import { resetNotificationCount } from "@/redux/reducers/chat";
import { setIsOpenNotifications } from "@/redux/reducers/misc";
import myLogo from "../../assets/mylogo.png";

function Header({ handleDeleteChat, onlineUsers = [], newMessagesAlert = [] }) {
  const dispatch = useDispatch();
  const params = useParams();
  const chatId = params.chatId;
  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
  const { user } = useSelector((state) => state.auth);
  const { notificationCount } = useSelector((state) => state.chat);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isOpenNotifications } = useSelector((state) => state.misc);

  const {} = useSelector((state) => state.misc);

  const handleSearch = () => {
    console.log("Search function");
  };
  const handleNotifications = () => {
    /* dispatch(setIsOpenNotifications(true)); */
    dispatch(resetNotificationCount());
  };

  const closeHandler = () => {
    dispatch(setIsOpenNotifications(false));
  };

  return (
    <header className="h-[3.5rem] bg-gradient-to-r from-blue-400 md:from-[#602f62] to-cyan-700 md:to-[#613063] rounded-lg mx-2 my-1">
      <nav className=" flex  lg:flex-row justify-between z-50 h-full py-2  px-4">
        <div className="flex justify-between w-full lg:w-auto">
          <span className="items-center hidden md:block">
            <img src={myLogo} className="h-[3.5rem] w-full -my-2" /> 
          </span>

          <Drawer>
            <DrawerTrigger>
              <div className="hover:bg-blue-400  rounded-full md:hidden p-2 cursor-pointer text-white">
                <CiMenuBurger
                  className="h-[1.5rem] w-[1.5rem]"
                  onClick={handleNotifications}
                  title="Notifications"
                />
              </div>
            </DrawerTrigger>
            <DrawerContent className="bg-gradient-to-r from-violet-200 to-sky-300 pb-2">
              {isLoading ? (
                <Skeleton />
              ) : (
                  
                <ChatList
                  chats={data.chats}
                  chatId={chatId}
                  newMessagesAlert={newMessagesAlert}
                  handleDeleteChat={handleDeleteChat}
                  onlineUsers={onlineUsers}
                />
              )}
            </DrawerContent>
          </Drawer>
          {/* <div className="md:hidden items-center align-middle text-white">
            <CiMenuBurger className="h-[1.5rem] w-[1.5rem] mt-2.5" />
          </div> */}
        </div>
        <div className="flex items-center gap-4 justify-between text-white ">
          <Dialog>
            <DialogTrigger>
              <div className="hover:scale-125 rounded-full p-2 cursor-pointer">
                <IoIosSearch
                  className="h-[1.5rem] w-[1.5rem]"
                  onClick={handleSearch}
                  title="Search"
                />
              </div>
            </DialogTrigger>
            <DialogContent className=" md:w-[500px] w-[85vw] rounded-lg max-h-[80vh]">
              <Search />
            </DialogContent>
          </Dialog>

          <Dialog open={isNewGroup} onOpenChange={setIsNewGroup}>
            <DialogTrigger>
              <div className="hover:scale-125  rounded-full p-2 cursor-pointer">
                <CiCirclePlus
                  className="h-[1.5rem] w-[1.5rem]"
                  title="New Group"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="md:w-[500px] w-[85vw] rounded-lg">
              <NewGroups openCloseHandler={setIsNewGroup} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <div className="hover:scale-125 rounded-full p-2 cursor-pointer">
                <MdGroups
                  className="h-[1.5rem] w-[1.5rem]"
                  title="Manage Group"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="md:h-[80vh] h-[60vh] md:w-[800px] w-[80vw] rounded-lg">
              <Groups />
            </DialogContent>
          </Dialog>

          <Popover>
            <PopoverTrigger>
              <div className="relative hover:scale-125 rounded-full p-2 cursor-pointer">
                <FaBell
                  className="h-[1.5rem] w-[1.5rem]"
                  title="Notifications"
                  onClick={handleNotifications}
                />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                    {notificationCount}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-4 md:w-[500px] w-[90vw]">
              <Notifications />
            </PopoverContent>
          </Popover>

          <Drawer
            direction="right"
            className="outline-none"
            open={isProfileOpen}
            onOpenChange={setIsProfileOpen}
          >
            <DrawerTrigger asChild>
              <div className="relative hover:scale-125 rounded-full p-2 cursor-pointer">
                <h1>
                  <CgProfile
                    className="h-[1.5rem] w-[1.5rem]"
                    title="Profile"
                  />
                </h1>
              </div>
            </DrawerTrigger>
            <DrawerContent className="top-0 right-0 left-auto px-4 mt-0 bg-transparent border-none  md:w-[500px] w-[80vw] outline-none rounded-none">
              <ProfileCard openCloseHandler={setIsProfileOpen} />
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}

export default Header;
