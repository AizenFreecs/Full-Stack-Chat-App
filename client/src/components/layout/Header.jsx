import React from "react";
import { CiMenuBurger, CiCirclePlus } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { FaBell } from "react-icons/fa6";

import { CgProfile } from "react-icons/cg";
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
import ProfileCard from "../shared/ProfileCard";

function Header() {
  const handleSearch = () => {
    console.log("Search function");
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
          <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
            <IoIosSearch
              className="h-[1.5rem] w-[1.5rem]"
              onClick={handleSearch}
              title="Search"
            />
          </div>
          <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
            <CiCirclePlus className="h-[1.5rem] w-[1.5rem]" title="New Group" />
          </div>
          <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
            <MdGroups className="h-[1.5rem] w-[1.5rem]" title="Manage Group" />
          </div>
          <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
            <FaBell className="h-[1.5rem] w-[1.5rem]" title="Notifications" />
          </div>
          <div className="hover:bg-orange-500 rounded-full p-2 cursor-pointer">
            <Drawer direction="right" className="outline-none  ">
              <DrawerTrigger asChild>
                <h1><CgProfile className="h-[1.5rem] w-[1.5rem]" title="Profile" /></h1>
              </DrawerTrigger>
              <DrawerContent className="top-0 right-0 left-auto px-4 mt-0 bg-transparent border-none  md:w-[500px] w-[80vw] outline-none rounded-none">
                <ProfileCard  />
              </DrawerContent>
            </Drawer>
          </div>
         
        </div>
      </nav>
    </header>
  );
}

export default Header;
