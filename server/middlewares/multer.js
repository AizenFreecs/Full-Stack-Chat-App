import multer from "multer";

const multerUpload = multer({ limits: { fileSize: 1204 * 1024 * 5 } });

const userAvatar = multerUpload.single("avatar")

const multerAttachement = multerUpload.array("files", 10)

export { multerUpload, userAvatar, multerAttachement };
