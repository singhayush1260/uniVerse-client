import { createReducer } from "@reduxjs/toolkit";

const initialState={
    stories: [
        {
          name: "Evgen",
          userId: "ledo_evgen",
          profile_picture:
            "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
        },
        {
          name: "Nathan",
          userId: "232d",
          profile_picture:"data:image/jpeg;base64,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",
        },
        {
          name: "Emma",
          userId: "emaj2",
          profile_picture:
            "https://png.pngtree.com/background/20230525/original/pngtree-cute-anime-girl-wearing-flowers-picture-image_2735301.jpg",
        },
        {
          name: "John",
          userId: "djoa",
          profile_picture:
            "https://scontent.fdel1-5.fna.fbcdn.net/v/t1.6435-9/97385260_2936716216407351_8560513812619329536_n.jpg?stp=c0.62.629.629a_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=7a1959&_nc_ohc=v2b8Xb5-clgAX_SPXqr&_nc_ht=scontent.fdel1-5.fna&oh=00_AfBGZS6RlnuQWjb4sx9yCmfu6QS78aRMObcM7eXIYMALng&oe=657DAB37",
        },
        {
          name: "Sydney",
          userId: "dd3",
          profile_picture:
            "https://1.bp.blogspot.com/-0axxUpjw4HI/X_q-lTFPfHI/AAAAAAAAhYc/FbLIak1C1sYuSeC7-AUKu1Yv7d882T12wCLcBGAsYHQ/s622/Stylish%2BGirl%2BHide%2BFace%2BFB%2BDP%2B2021%2B%25289%2529.jpg",
        },
        {
          name: "Billy Butcher",
          userId: "fdfd",
          profile_picture:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgisOJupgCpbXQf-ZBMILQfX54UoqV0B0N_g&usqp=CAU",
        },
      ]
}
export const storyReducer=createReducer(initialState,{
    toggleTheme:(state)=>{
        
    }
})