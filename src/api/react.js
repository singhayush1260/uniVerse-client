const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const reactOn = async ({ like, reaction, model, parentId }) => {
  const response = await fetch(`${API_BASE_URL}/api/react/${parentId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ like, reaction, model }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const getReaction = async (parentId) => {
  const response = await fetch(`${API_BASE_URL}/api/react/${parentId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  reaction");
  }
  return response.json();
};
