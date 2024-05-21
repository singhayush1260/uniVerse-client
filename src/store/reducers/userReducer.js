import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn:false,
   userData:null
}
export const userReducer=createReducer(initialState,{
    setUser:(state,action)=>{
        state.isLoggedIn=Boolean(action.payload)
        state.userData=action.payload
    },
    logout:(state)=>{
        state.userData=null
    }
})