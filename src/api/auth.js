
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validatetoken`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};

export const getOTP=async(email)=>{
  //console.log("email data from api",email);
  const response = await fetch(`${API_BASE_URL}/api/auth/signup/email`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });
  
    const body = await response.json();
    if (!response.ok) {
      //console.log("response not okay",body)
      throw new Error(body.message);
    }
   // console.log("signup response",body);
    return body;
  }
  export const verifyOTP=async(email,otp)=>{
    //console.log("verify otp",otp);
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
       // console.log("response not okay",body)
        throw new Error(body.message);
      }
     // console.log("verify otp response",body);
      return body;
    }

    export const createUser=async({name,username,email,password})=>{
     // console.log("create account",username,email,password);
      const response = await fetch(`${API_BASE_URL}/api/auth/signup/createuser`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name,username,email,password}),
        });
      
        const body = await response.json();
        if (!response.ok) {
       //   console.log("response not okay",body)
          throw new Error(body.message);
        }
       // console.log("create user response",body);
        return body;
      }

      export const dashboardApi=async()=>{
        //console.log("create account",username,email,password);
        const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
            credentials: "include",
          });
          const body = await response.json();
          if (!response.ok) {
           // console.log(" dashboard response not okay",body)
            throw new Error(body.message);
          }
         // console.log("dashboard response",body);
          return body;
        }

export const login=async(data)=>{
//console.log("login data from api",data);
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
 // console.log("login response",body);
  return body;
}

export const logout = async () => {
  console.log("logout api")
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
};