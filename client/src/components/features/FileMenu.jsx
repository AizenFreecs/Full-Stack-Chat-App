import React, { useRef } from "react";
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
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUploadingLoader } from "@/redux/reducers/misc";
import { useSendAttachementsMutation } from "@/redux/api/api";

function FileMenu({ chatId }) {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const documentRef = useRef(null);
  const dispatch = useDispatch();
  const [sendAttachements] = useSendAttachementsMutation();

  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  const selectRef = (ref) => {
    ref.current?.click();
  };
  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    if (files.length <= 0) return;
    if (files.length > 10)
      return toast.error(`Only maximum 10 ${key} files can be sent a time`);
    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    
    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));
     
      const res = await sendAttachements(myForm);
      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  const handleImageChange = () => {
    console.log("function called");
  };

  return (
    <>
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
            <DropdownMenuItem
              className="text-xl flex items-center gap-2 cursor-pointer"
              onClick={() => selectRef(imageRef)}
            >
              <IoImages /> Image
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xl flex items-center gap-2 cursor-pointer"
              onClick={() => selectRef(videoRef)}
            >
              <MdVideoCameraBack /> Video
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xl flex items-center gap-2 cursor-pointer"
              onClick={() => selectRef(audioRef)}
            >
              <MdAudioFile /> Audio
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xl flex items-center gap-2 cursor-pointer"
              onClick={() => selectRef(documentRef)}
            >
              <IoMdDocument /> Document
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg, image/gif"
        className="hidden"
        ref={imageRef}
        multiple
        onChange={(e) => fileChangeHandler(e, "Image")}
      />
      <input
        type="file"
        accept="video/mp4, video/webm, video/ogg"
        className="hidden"
        ref={videoRef}
        multiple
        onChange={(e) => fileChangeHandler(e, "Video")}
      />
      <input
        type="file"
        accept="audio/mp3, audio/wav"
        className="hidden"
        ref={audioRef}
        multiple
        onChange={(e) => fileChangeHandler(e, "Audio")}
      />
      <input
        type="file"
        accept="*"
        className="hidden"
        ref={documentRef}
        multiple
        onChange={(e) => fileChangeHandler(e, "Document")}
      />
    </>
  );
}

export default FileMenu;
