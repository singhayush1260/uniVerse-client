const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const uploadToCloudinary = async (formData) => {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
    {
      method: "POST",

      body: formData,
    }
  );

  const body = await response.json();
  if (!response.ok) {
    console.log("response not okay", body);
    throw new Error(body.message);
  }
  return body;
};

export const createPost = async ({ caption, attachments }) => {
  const response = await fetch(`${API_BASE_URL}/api/post`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ attachments, caption }),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const deletePost = async (postId) => {
  const response = await fetch(`${API_BASE_URL}/api/post/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const updatePost = async ({ postId, updatedCaption }) => {
  const response = await fetch(`${API_BASE_URL}/api/post/${postId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ caption: updatedCaption }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const getAllPostsByUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/post?userId=${userId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  all posts by user");
  }
  return response.json();
};

export const getAllPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/post/community`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error getting  all posts");
  }
  return response.json();
};
