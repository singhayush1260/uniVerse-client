import { useDispatch } from "react-redux";
const useLogin=()=>{

   const dispatch=useDispatch();

    const login=()=>{

    }
    const logout=()=>{
        dispatch({type:"logout"})
    }
    return {login, logout};
}
export default useLogin;