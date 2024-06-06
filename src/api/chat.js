const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllChatHeads = async () => {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  all chat heads");
  }
  return response.json();
};

export const getIceBreaker = async (userId) => {
  //console.log("ice breaker",userId);
  const response = await fetch(
    `${API_BASE_URL}/api/chat/one-liners/${userId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Error getting  one liners");
  }
  return response.json();
};
