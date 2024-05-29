const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;

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

    export const getReaction = async (parentId) => {
      console.log("getReaction parentId",parentId);
      const response = await fetch(`${API_BASE_URL}/api/react/${parentId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error getting  reaction");
      }
      return response.json();
    };