
const API_BASE_URL = import.meta.env.VITE_LOCAL_API_BASE_URL;

const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

export const uploadToCloudinary=async(formData)=>{
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, {
        method: "POST", 
       
        body: formData,
      });
    
      const body = await response.json();
      if (!response.ok) {
        console.log("response not okay",body)
        throw new Error(body.message);
      }
      console.log("upload to clidi response",body);
      return body;
    }

export const createPost=async({caption,attachments})=>{
  console.log("create post data from api",caption,attachments);
  const response = await fetch(`${API_BASE_URL}/api/post`, {
      method: "POST", 
      credentials: "include", 
      headers: { 
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify({attachments,caption}),
    });
  
    const body = await response.json();
    if (!response.ok) {
      console.log("response not okay",body)
      throw new Error(body.message);
    }
    console.log("signup response",body);
    return body;
  }
  export const verifyOTP=async(email,otp)=>{
    console.log("verify otp",otp);
    const response = await fetch(`${API_BASE_URL}/api/auth/signup/email`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,otp}),
      });
    
      const body = await response.json();
      if (!response.ok) {
        console.log("response not okay",body)
        throw new Error(body.message);
      }
      console.log("verify otp response",body);
      return body;
    }

    export const createUser=async({username,email,password})=>{
      console.log("create account",username,email,password);
      const response = await fetch(`${API_BASE_URL}/api/auth/signup/createuser`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username,email,password}),
        });
      
        const body = await response.json();
        if (!response.ok) {
          console.log("response not okay",body)
          throw new Error(body.message);
        }
        console.log("create user response",body);
        return body;
      }

export const login=async(data)=>{
console.log("login data from api",data);
const{Email:username,Password:password}=data;
const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username,password}),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  console.log("login response",body);
  return body;
}

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
};