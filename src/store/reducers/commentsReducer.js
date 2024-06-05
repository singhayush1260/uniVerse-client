import { createReducer } from "@reduxjs/toolkit";
const getRandomDate = () => {
    const start = new Date(2023, 0, 1); // Start date (January 1, 2023)
    const end = new Date(); // Current date
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
const initialState={
   
      comments: [
        {
          parentId: null,
          commentId: 1,
          commentBody: "This is the first comment",
          likesCount: 5,
          createdAt: getRandomDate()
        },
        {
          parentId: 1,
          commentId: 2,
          commentBody: "Reply to the first comment",
          likesCount: 3,
          createdAt: getRandomDate()
        },
        {
          parentId: null,
          commentId: 3,
          commentBody: "Another independent comment",
          likesCount: 7,
          createdAt: getRandomDate()
        },
        {
          parentId: 2,
          commentId: 4,
          commentBody: "Reply to the second comment",
          likesCount: 2,
          createdAt: getRandomDate()
        },
        {
          parentId: null,
          commentId: 5,
          commentBody: "Fifth comment here",
          likesCount: 8,
          createdAt: getRandomDate()
        },
        {
          parentId: 3,
          commentId: 6,
          commentBody: "Reply to the third comment",
          likesCount: 4,
          createdAt: getRandomDate()
        },
        {
          parentId: 5,
          commentId: 7,
          commentBody: "Reply to the fifth comment",
          likesCount: 1,
          createdAt: getRandomDate()
        },
        {
          parentId: null,
          commentId: 8,
          commentBody: "Yet another standalone comment",
          likesCount: 6,
          createdAt: getRandomDate()
        },
        {
          parentId: 4,
          commentId: 9,
          commentBody: "Reply to the fourth comment",
          likesCount: 3,
          createdAt: getRandomDate()
        },
        {
          parentId: 7,
          commentId: 10,
          commentBody: "Reply to the seventh comment",
          likesCount: 2,
          createdAt: getRandomDate()
        },
        {
            parentId: 1,
            commentId: 11,
            commentBody: "Second reply to the first comment",
            likesCount: 99,
            createdAt: getRandomDate()
          },
      ]   
}
export const commentsReducer=createReducer(initialState,{   
    addComment:(state,action)=>{
      console.log("new comment",action.payload);
        state.comments.push(action.payload)
    }
})