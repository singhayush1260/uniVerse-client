import { createReducer } from "@reduxjs/toolkit";

const initialState={
    posts:[
        {
          name: "John Doe",
          userId: "john123",
          postId:"323d",
          caption: "Enjoying a beautiful sunny day in the park with friends. Good times and great memories!",
          image: "https://images.pexels.com/photos/18704675/pexels-photo-18704675/free-photo-of-buildings-by-river-in-amasya-in-turkey.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          likes:"24",
          timestamp: new Date()
        },
        {
          name: "Jane Smith",
          userId: "jane456",
          postId:"32d",
          caption: "Dinner with amazing friends. Delicious food, laughter, and good vibes all around. Grateful for these moments!",
          image: "https://images.pexels.com/photos/19097344/pexels-photo-19097344/free-photo-of-brunette-woman-in-jacket.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          likes:"41",
          timestamp: new Date()
        },
        {
          name: "Bob Williams",
          userId: "bob789",
          postId:"323cd",
          caption: "Exploring breathtaking landscapes. Nature's wonders never cease to amaze. Feeling blessed to witness such beauty!",
          image: "https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"56",
          timestamp: new Date()
        },
        {
          name: "Eva Miller",
          userId: "eva101",
          postId:"3",
          caption: "Chasing sunsets and capturing the magic. Each sunset tells a story. Here's to new beginnings and endless possibilities!",
          image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"10",
          timestamp: new Date()
        },
        {
          name: "Alex Johnson",
          userId: "alex202",
          postId:"323dsas",
          caption: "Coffee dates and deep conversations. Nothing beats the warmth of a good conversation and a hot cup of coffee!",
          image: "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"81",
          timestamp: new Date()
        },
        {
          name: "Sophie Davis",
          userId: "sophie303",
          postId:"3lp",
          caption: "Lost in the world of books. Books have the power to transport us to different worlds and ignite our imagination!",
          image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"12",
          timestamp: new Date()
        },
        {
          name: "Chris Brown",
          userId: "chris404",
          postId:"3plmar",
          caption: "Adventures with furry friends. Dogs make the best companions on outdoor adventures. Their joy is contagious!",
          image: "https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"114",
          timestamp: new Date()
        },
        {
          name: "Mia Clark",
          userId: "mia505",
          postId:"3ca13",
          caption: "Creating art that speaks. Art allows us to express emotions and thoughts in ways words sometimes cannot capture. Here's my latest creation!",
          image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"19",
          timestamp: new Date()
        },
        {
          name: "Liam White",
          userId: "liam606",
          postId:"bnk",
          caption: "Musical vibes and late-night jams. Music has the power to soothe the soul and transport us to different realms!",
          image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"24",
          timestamp: new Date()
        },
        {
          name: "Ava Taylor",
          userId: "ava707",
          postId:"3lm7ya",
          caption: "Sunrise yoga for a peaceful start. Embracing the serenity of the morning and setting positive intentions for the day ahead.",
          image: "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"55",
          timestamp: new Date()
        },
        {
          name: "Noah Smith",
          userId: "noah808",
          postId:"3pla690",
          caption: "Savoring the flavors of local cuisine. Exploring the culinary delights of the city and discovering new favorite spots!",
          image: "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=600",
          likes:"19",
          timestamp: new Date()
        },
        {
          name: "Emma Davis",
          userId: "emma909",
          postId:"32@",
          caption: "Rainy days and cozy reads. There's something magical about reading a good book while the raindrops create a symphony outside.",
          image: "https://images.pexels.com/photos/19097344/pexels-photo-19097344/free-photo-of-brunette-woman-in-jacket.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          likes:"32",
          timestamp: new Date()
        },
        {
          name: "Oliver Johnson",
          userId: "oliver1010",
          postId:"3nnmnd",
          caption: "The joy of a simple picnic. Good food, a blanket on the grass, and the company of loved ones. Simple pleasures, big smiles!",
          image: "https://images.pexels.com/photos/18704675/pexels-photo-18704675/free-photo-of-buildings-by-river-in-amasya-in-turkey.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          likes:"67",
          timestamp: new Date()
        },
      ]
      
}
export const postReducer=createReducer(initialState,{
    toggleTheme:(state)=>{
        state.isDarkTheme=!state.isDarkTheme
    }
})