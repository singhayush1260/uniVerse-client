const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllRequests = async () => {
  const response = await fetch(`${API_BASE_URL}/api/friend/request`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  all requests");
  }
  return response.json();
};

export const sendRequest = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/friend/request/add/${userId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const acceptRequest = async (reqId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/friend/request/accept/${reqId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const declineRequest = async (reqId) => {
  const response = await fetch(`${API_BASE_URL}/api/friend/remove/${reqId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const removeFriend = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/friend/${userId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const getFriends = async () => {
  const response = await fetch(`${API_BASE_URL}/api/friend`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  all friemds");
  }
  const body = await response.json();
  return body;
};
