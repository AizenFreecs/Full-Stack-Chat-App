import { userSocketIds } from "../app.js"

const getOtherMember = (members, userID) => {
    return members.find((member)=>member._id.toString() !== userID.toString())
}

const getSockets = (users) => {
  return users.map((user)=>userSocketIds.get(user._id.toString()))
}

const getBase64 = (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`

export {getOtherMember,getSockets,getBase64}