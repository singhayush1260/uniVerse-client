const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;

export const getUser = async (userId) => {
  console.log("userId from getUser", userId);
  const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  user");
  }
  return response.json();
};

export const searchCommunityUser = async (username) => {
  console.log("username from searchCommunityUser", username);
  const response = await fetch(
    `${API_BASE_URL}/api/user/community/${username}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Error getting  user");
  }
  return response.json();
};
