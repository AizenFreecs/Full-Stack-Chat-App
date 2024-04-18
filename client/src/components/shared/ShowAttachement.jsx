import React from "react";
import { transformImage } from "@/lib/features";
import { FileIcon } from "@radix-ui/react-icons";

function ShowAttachement({ file, url }) {
  if (file === "video") {
    return <video src={url} preload="none" width={"200px"} controls />;
  } else if (file === "image") {
    return (
      <img
        src={transformImage(url)}
        alt="file not found"
        className="w-[200px] h-[150px] object-contain"
      />
    );
  } else if (file === "audio") {
    return <audio src={url} preload="none" controls />;
  } else {
    return <FileIcon />;
  }
}

export default ShowAttachement;
