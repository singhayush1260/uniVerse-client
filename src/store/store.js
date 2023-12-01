import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./reducers/themeReducer";
import { userReducer } from "./reducers/userReducer";
import { storyReducer } from "./reducers/storyReducer";
import { notificationReducer } from "./reducers/notificationReducer";
import { likesReducer } from "./reducers/likesReducer";
import { friendsReducer } from "./reducers/friendsReducer";
import { postReducer } from "./reducers/postReducer";
import {commentsReducer} from './reducers/commentsReducer';
const store = configureStore({
  reducer: {
    themeReducer,
    userReducer,
    storyReducer,
    notificationReducer,
    likesReducer,
    friendsReducer,
    postReducer,
    commentsReducer
  }
});
export default store;
