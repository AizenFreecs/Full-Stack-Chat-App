const fileFormatChecker = (url = "") => {
  const fileExtension = url.split(".").pop();
  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg" ||
    fileExtension === "mkv"
  )
    return "video";
  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";
  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif"
  )
    return "image";
  return "file";
};

const transformImage = (url = "") => {
  return url;
};
export { fileFormatChecker,transformImage };
