import { createReducer } from "@reduxjs/toolkit";

const initialState={
    friends: [
        {
          name: "John Doe",
          username: "john123",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-15T08:30:00")
        },
        {
          name: "Jane Smith",
          username: "jane456",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-15T12:45:00")
        },
        {
          name: "Bob Williams",
          username: "bob789",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-15T15:20:00")
        },
        {
          name: "Eva Miller",
          username: "eva101",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-16T09:10:00")
        },
        {
          name: "Alex Johnson",
          username: "alex202",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-16T14:30:00")
        },
        {
          name: "Sophie Davis",
          username: "sophie303",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-16T18:45:00")
        },
        {
          name: "Chris Brown",
          username: "chris404",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-17T11:25:00")
        },
        {
          name: "Mia Clark",
          username: "mia505",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-17T16:40:00")
        },
        {
          name: "Liam White",
          username: "liam606",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-17T20:15:00")
        },
        {
          name: "Ava Taylor",
          username: "ava707",
          profile_picture: "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          lastSeen: new Date("2023-01-18T09:55:00")
        }
      ]
}
export const friendsReducer=createReducer(initialState,{
    toggleTheme:(state)=>{
        state.isDarkTheme=!state.isDarkTheme
    }
})



  
  