import { createReducer } from "@reduxjs/toolkit";

const initialState={
    notifications :[
        {
          id: 1,
          name: "John Doe",
          message: "mentioned you in a post",
          timestamp: new Date(),
          type: "mention",
          read: false,
          postLink: "https://example.com/posts/123",
          profile_picture: ""
        },
        {
          id: 2,
          name: "Jane Smith",
          message: "liked your photo",
          timestamp: new Date(),
          type: "like",
          read: true,
          photoLink: "https://example.com/photos/456",
          profile_picture: ""
        },
        {
          id: 3,
          name: "Alice Johnson",
          message: "started following you",
          timestamp: new Date(),
          type: "follow",
          read: false,
          profileLink: "https://example.com/profiles/alice",
          profile_picture: ""
        },
        {
          id: 4,
          name: "Bob Williams",
          message: "commented on your status",
          timestamp: new Date(),
          type: "comment",
          read: true,
          statusLink: "https://example.com/status/789",
          profile_picture: ""
          },
        {
          id: 5,
          name: "Eva Miller",
          message: "shared your post",
          timestamp: new Date(),
          type: "share",
          read: false,
          postLink: "https://example.com/posts/987",
          profile_picture: ""
        },
        {
          id: 6,
          name: "Chris Brown",
          message: "sent you a friend request",
          timestamp: new Date(),
          type: "friendRequest",
          read: true,
          profileLink: "https://example.com/profiles/chris",
          profile_picture: ""
        },
        {
          id: 7,
          name: "Grace Taylor",
          message: "tagged you in a photo",
          timestamp: new Date(),
          type: "tag",
          read: false,
          photoLink: "https://example.com/photos/654",
          profile_picture: ""
        },
        {
          id: 8,
          name: "David Clark",
          message: "reacted to your story",
          timestamp: new Date(),
          type: "reaction",
          read: true,
          storyLink: "https://example.com/stories/321",
          profile_picture: ""
        },
        {
          id: 9,
          name: "Sophie Jones",
          message: "invited you to an event",
          timestamp: new Date(),
          type: "eventInvite",
          read: false,
          eventLink: "https://example.com/events/123",
          profile_picture: ""
        },
        {
          id: 10,
          name: "Michael Lee",
          message: "commented on your video",
          timestamp: new Date(),
          type: "videoComment",
          read: true,
          videoLink: "https://example.com/videos/456",
          profile_picture: ""
        },
      ]
}
export const notificationReducer=createReducer(initialState,{
    toggleTheme:(state)=>{
        state.isDarkTheme=!state.isDarkTheme
    }
})