import React, { useState, Suspense } from "react";
import { CiMenuBurger, CiCirclePlus } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import ProfileCard from "../shared/ProfileCard";
import Notifications from "../features/Notifications";
import Search from "../features/Search";
import NewGroups from "../features/NewGroups";
import Groups from "../features/Groups";

function Header() {
  const [isNotifications, setNotifications] = useState(false);
  const handleSearch = () => {
    console.log("Search function");
  };
  const handleNotifications = () => {
    setNotifications(true);
  };
  return (
    <header className="h-[4rem] bg-orange-400">
      <nav className=" flex  lg:flex-row justify-between z-50 h-full py-2  px-4">
        <div className="flex justify-between w-full lg:w-auto">
          <span className="items-center pt-3 hidden md:block">
            Aizen's Chat
          </span>
          <div className="md:hidden items-center align-middle text-white">
            <CiMenuBurger className="h-[1.5rem] w-[1.5rem] mt-2.5" />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between text-white ">
          <Dialog>
            <DialogTrigger>
              <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
                <IoIosSearch
                  className="h-[1.5rem] w-[1.5rem]"
                  onClick={handleSearch}
                  title="Search"
                />
              </div>
            </DialogTrigger>
            <DialogContent className=" md:w-[500px] w-[80vw] rounded-lg max-h-[80vh]">
              <Search />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
                <CiCirclePlus
                  className="h-[1.5rem] w-[1.5rem]"
                  title="New Group"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="md:w-[500px] w-[80vw] rounded-lg">
              <NewGroups />
            </DialogContent>
          </Dialog>
          <Dialog >
            <DialogTrigger>
              <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
                <MdGroups
                  className="h-[1.5rem] w-[1.5rem]"
                  title="Manage Group"
                />
              </div>
            </DialogTrigger>
            <DialogContent  className="md:h-[80vh] h-[60vh] md:w-[800px] w-[80vw] rounded-lg">
              <Groups />
            </DialogContent>
          </Dialog>

          <Popover>
            <PopoverTrigger>
              <div className=" hover:bg-orange-500 rounded-full p-2 cursor-pointer">
                <FaBell
                  className="h-[1.5rem] w-[1.5rem]"
                  title="Notifications"
                  onClick={handleNotifications}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-4 md:w-[500px] w-[90vw]">
              <Notifications />
            </PopoverContent>
          </Popover>

          <Drawer direction="right" className="outline-none  ">
            <DrawerTrigger asChild>
              <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
                <h1>
                  <CgProfile
                    className="h-[1.5rem] w-[1.5rem]"
                    title="Profile"
                  />
                </h1>
              </div>
            </DrawerTrigger>
            <DrawerContent className="top-0 right-0 left-auto px-4 mt-0 bg-transparent border-none  md:w-[500px] w-[80vw] outline-none rounded-none">
              <ProfileCard />
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}

export default Header;
