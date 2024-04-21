const getOtherMember = (members, userID) => {
    return members.find((member)=>member._id.toString() !== userID.toString())
}

export {getOtherMember}