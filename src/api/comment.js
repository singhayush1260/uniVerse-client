const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addComment = async (data) => {
    const{postId,commentId,message}=data;
    let url;
    if(commentId){
       url= `${API_BASE_URL}/api/comment/${postId}/?commentId=${commentId}`; 
    }
    else{
        url=`${API_BASE_URL}/api/comment/${postId}`
    }
    const response = await fetch(url,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );
    const body = await response.json();
    if (!response.ok) {
      console.log("add comment not okay", body);
      throw new Error(body.message);
    }
    return body;
  };

  export const getAllComments = async (parentId) => {
    const response = await fetch(`${API_BASE_URL}/api/comment/${parentId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error getting  all comments");
    }
    return response.json();
  };

  
  export const getReplies = async (data) => {
    const{postId,commentId}=data;
    const response = await fetch(`${API_BASE_URL}/api/comment/${postId}/?commentId=${commentId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error getting  all comments");
    }
    return response.json();
  };