const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



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


    export const acceptRequest=async(reqId)=>{
      console.log("accept req api",reqId);
      const response = await fetch(`${API_BASE_URL}/api/friend/request/accept/${reqId}`, {
          method: "PATCH", 
          credentials: "include", 
          headers: {
              "Content-Type": "application/json",
            },
        });
        const body = await response.json();
        if (!response.ok) {
          console.log("accept request not okay",body)
          throw new Error(body.message);
        }
        return body;
      }

      export const declineRequest=async(reqId)=>{
        console.log("decline req api",reqId);
        const response = await fetch(`${API_BASE_URL}/api/friend/remove/${reqId}`, {
            method: "PATCH", 
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
              },
          });
          const body = await response.json();
          if (!response.ok) {
            console.log("decline request not okay",body)
            throw new Error(body.message);
          }
          return body;
        }

        export const getFriends = async () => {
          console.log("get All freins")
          const response = await fetch(`${API_BASE_URL}/api/friend`, {
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Error getting  all friemds");
          }
          const body=await response.json();
          console.log("friends response body",body)
          return body;
        };