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

export { LayoutLoader };
