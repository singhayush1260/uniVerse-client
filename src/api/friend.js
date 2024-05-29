const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;



export const getAllRequests = async () => {
    console.log("getAllRequests")
    const response = await fetch(`${API_BASE_URL}/api/friend/request`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error getting  all requests");
    }
    return response.json();
  };

  export const sendRequest=async(userId)=>{
    console.log("send REQUEST on data from api",userId);
    const response = await fetch(`${API_BASE_URL}/api/friend/request/add/${userId}`, {
        method: "POST", 
        credentials: "include", 
        headers: {
            "Content-Type": "application/json",
          },
      });
      const body = await response.json();
      if (!response.ok) {
        console.log("send request not okay",body)
        throw new Error(body.message);
      }
      console.log("send request response",body);
      return body;
    }


export const reactOn=async({like,reaction,model,parentId})=>{
    console.log("react on data from api",like,reaction,model,parentId);
    const response = await fetch(`${API_BASE_URL}/api/react/${parentId}`, {
        method: "POST", 
        credentials: "include", 
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ like,reaction,model }),
      });
      const body = await response.json();
      if (!response.ok) {
        console.log("react on response not okay",body)
        throw new Error(body.message);
      }
      console.log("react response",body);
      return body;
    }