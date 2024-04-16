import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GrAttachment } from "react-icons/gr";
import { IoImages } from "react-icons/io5";
import { MdVideoCameraBack, MdAudioFile } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";

function FileMenu() {
  const [position, setPosition] = React.useState("bottom");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <GrAttachment className="h-[2rem] w-[2rem] hover:scale-110 cursor-pointer text-gray-500 p-1 mx-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select file type :</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-xl flex items-center gap-2 cursor-pointer">
            <IoImages /> Image
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xl flex items-center gap-2 cursor-pointer">
            <MdVideoCameraBack /> Video
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xl flex items-center gap-2 cursor-pointer">
            <MdAudioFile /> Audio
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xl flex items-center gap-2 cursor-pointer">
            <IoMdDocument /> Document
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FileMenu;
