const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  user");
  }
  const body = await response.json();
  return body;
};

export const getAllCommunityUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/community`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  community user");
  }
  const body = await response.json();
  return body;
};

export const searchCommunityUser = async (username) => {
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
