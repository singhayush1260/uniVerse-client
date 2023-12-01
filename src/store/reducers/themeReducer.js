import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isDarkTheme:true
}
export const themeReducer=createReducer(initialState,{
    toggleTheme:(state)=>{
        state.isDarkTheme=!state.isDarkTheme
        localStorage.setItem("isDarkTheme",state.isDarkTheme)
    }
})