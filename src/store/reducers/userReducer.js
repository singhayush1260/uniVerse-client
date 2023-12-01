import { createReducer } from "@reduxjs/toolkit";

const initialState={
   userData:{
    name:"Evgen Ledo",
    userId:"ledo_evgen",
    profile_picture:"https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
    cover_picture:"https://images.pexels.com/photos/4993220/pexels-photo-4993220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio:"Lorem, ipsum dolor  Veritatis voluptatem adipisci optio accusamus vel",
    followers:1233,
    following:4218,
   }
}
export const userReducer=createReducer(initialState,{
    logout:(state)=>{
        state.userData=null
    }
})