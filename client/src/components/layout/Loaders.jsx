import React from "react";
import { Skeleton } from "../ui/skeleton";

const LayoutLoader = () => {
  return (
    <div className="grid grid-cols-5 h-[calc(100vh)]">
      <div className="col-span-1  hidden sm:block p-4 ">
        <Skeleton className="h-full p-4" />
      </div>
      <div className="col-span-5 sm:col-span-4 md:col-span-3 flex flex-col gap-4 p-4 ">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>
      <div className="col-span-1 hidden md:block p-4 ">
        <Skeleton className="h-full p-4" />
      </div>
    </div>
  );
};

const TypingLoader = () => {
  return (
    <div id="typing-indicator" className=" flex items-center justify-center">
      <div className="typing-dot dot1 bg-green-500 h-2 w-2 rounded-full mx-1 animate-bounce"></div>
      <div className="typing-dot dot2 bg-green-500 h-2 w-2 rounded-full mx-1 animate-bounce animation-delay-200"></div>
      <div className="typing-dot dot3 bg-green-500 h-2 w-2 rounded-full mx-1 animate-bounce animation-delay-400"></div>
    </div>
  );
};

export { LayoutLoader, TypingLoader };
