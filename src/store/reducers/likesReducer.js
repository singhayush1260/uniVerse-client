import { createReducer } from "@reduxjs/toolkit";

const initialState={
    likes:[
        {
          id: 1,
          name: "Emily Johnson",
          message: "liked your post",
          timestamp: new Date(),
          type: "like",
          read: false,
          postLink: "https://example.com/posts/111",
          profile_picture: ""
        },
        {
          id: 2,
          name: "Alex Williams",
          message: "liked your photo",
          timestamp: new Date(),
          type: "like",
          read: true,
          photoLink: "https://example.com/photos/222",
          profile_picture: ""
        },
        {
          id: 3,
          name: "Olivia Davis",
          message: "liked your status",
          timestamp: new Date(),
          type: "like",
          read: false,
          statusLink: "https://example.com/status/333",
          profile_picture: ""
        },
        {
          id: 4,
          name: "Ethan Miller",
          message: "liked your video",
          timestamp: new Date(),
          type: "like",
          read: true,
          videoLink: "https://example.com/videos/444",
          profile_picture: ""
        },
        {
          id: 5,
          name: "Sophia Smith",
          message: "liked your comment",
          timestamp: new Date(),
          type: "like",
          read: false,
          commentLink: "https://example.com/comments/555",
          profile_picture: ""
        },
        {
          id: 6,
          name: "Logan Brown",
          message: "liked your article",
          timestamp: new Date(),
          type: "like",
          read: true,
          articleLink: "https://example.com/articles/666",
          profile_picture: ""
        },
        {
          id: 7,
          name: "Ava Jones",
          message: "liked your event",
          timestamp: new Date(),
          type: "like",
          read: false,
          eventLink: "https://example.com/events/777",
          profile_picture: ""
        },
        {
          id: 8,
          name: "Noah Taylor",
          message: "liked your message",
          timestamp: new Date(),
          type: "like",
          read: true,
          messageLink: "https://example.com/messages/888",
          profile_picture: ""
        },
        {
          id: 9,
          name: "Mia Clark",
          message: "liked your poll",
          timestamp: new Date(),
          type: "like",
          read: false,
          pollLink: "https://example.com/polls/999",
          profile_picture: ""
        },
        {
          id: 10,
          name: "Liam White",
          message: "liked your answer",
          timestamp: new Date(),
          type: "like",
          read: true,
          answerLink: "https://example.com/answers/1010",
          profile_picture: ""
        },
      ]
}
export const likesReducer=createReducer(initialState,{
    toggleTheme:(state)=>{
        state.isDarkTheme=!state.isDarkTheme
    }
})