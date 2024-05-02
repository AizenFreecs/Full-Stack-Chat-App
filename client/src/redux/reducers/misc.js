import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadingLoader: false,
  isDeleteChatOpen: false,
  isOpenNotifications:false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
    setIsDeleteChatOpen: (state, action) => {
      state.isDeleteChatOpen = action.payload;
    },
    setIsOpenNotifications : (state, action) => {
      state.isOpenNotifications = action.payload
    }
  },
});

export default miscSlice
export const { setUploadingLoader, setSelectedDeleteChat,setIsDeleteChatOpen,setIsOpenNotifications } = miscSlice.actions
