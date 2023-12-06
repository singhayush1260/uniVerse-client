import { useDispatch } from "react-redux"
const useAuth=()=>{

  const dispatch=useDispatch();  
    const signup=()=>{
        
    }
    const login=()=>{
      
    }
    const logout=()=>{
        dispatch({type:'logout'});
    }
    return {signup, login, logout}
}
export default useAuth;