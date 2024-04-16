import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import FileMenu from "@/components/features/FileMenu";

function Chat() {
  const containerRef = useRef(null);
  return (
    <main className="w-full h-full bg-white">
      <div
        ref={containerRef}
        className="w-full h-[90%] flex flex-col item-center p-[1rem] bg-slate-300 overflow-x-hidden overflow-y-auto"
      >
        
      </div>
      <form className="h-[10%] w-full flex items-center p-1 gap-4">
        <div className="flex w-full h-full items-center md:p-2 ">
        <FileMenu />
          <Input placeholder="Type your Message" className=" w-full mr-2" />
          <Button variant="empty" className="hover:text-red-500 ">
            <IoSend className="mx-2 h-[1.5rem] w-[1.5rem] cursor-pointer" />
          </Button>
        </div>
      </form>
    </main>
  );
}

export default AppLayout()(Chat);
