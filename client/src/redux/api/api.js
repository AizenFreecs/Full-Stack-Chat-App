import { server } from "@/constants/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api`,
  }),
  tagTypes: ["Chat", "User", "Message"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({ url: "/chat/mychats", credentials: "include" }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/sendrequest",
        method: "put",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: "/user/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/acceptrequest",
        method: "put",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;
        if (populate) url += "?populate=true";
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    getOldMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachements: builder.mutation({
      query: (data) => ({
        url: "/chat/message",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    myGroups: builder.query({
      query: () => ({ url: "/chat/mygroups", credentials: "include" }),
      providesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: (chatId) => {
        let url = `/user/friends`
        if(chatId) url += `?chatId=${chatId}`
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    newGroup: builder.mutation({
      query: (data) => ({
        url: "/chat/newgroup",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `/chat/${chatId}`,
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    removeGroupMember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `/chat/removemember`,
        method: "DELETE",
        body: {chatId, userId },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    addGroupMembers: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `/chat/addmembers`,
        method: "PUT",
        body: { chatId, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    leaveGroup: builder.mutation({
      query: ( chatId ) => ({
        url: `/chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetOldMessagesQuery,
  useSendAttachementsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation
} = api;
