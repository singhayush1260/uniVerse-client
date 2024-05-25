import classes from "./SearchUser.module.scss";
import { useState } from "react";
import { useQuery, useMutation,useQueryClient } from "react-query";
import { motion } from "framer-motion";
import LazyImage from "../../lazy-image/LazyImage";
import CircularLoader from "../../loaders/circular-loader/CircularLoader";
import useDebounce from "../../../hooks/useDebounce";
import {searchCommunityUser} from "../../../api/user";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
const SearchUser = () => {
  const [searchParam, setSearchParam] = useState("");
  const isSeaching = searchParam.length > 0;
  //console.log("isSeaching",isSeaching)
  //let c=1;
  //console.log("Search userr..........");
  const fetchData = (e) => {
    console.log("Fetching data...", e.target.value);
    console.log("search param", searchParam);
  };
  const { data:users, error, isLoading,refetch } = useQuery(["searchCommunityUser", searchParam], () => searchCommunityUser(searchParam), {
    enabled: false
  });

  console.log("data from search user",users);


  const debouncedSearch=useDebounce(refetch,1000);

  return (
    <div className={classes.search_user}>
      <input type="text" placeholder="Search.." value={searchParam} onKeyUp={(e)=>debouncedSearch(e)} onChange={(e)=>setSearchParam(e.target.value)} />
     { isSeaching && <motion.div className={classes.search_result} initial={{ y: "-40px" }}
   animate={{ y: "-5px" }}
   exit={{ y: "-40px" }}
   transition={{ duration: 0.5 }}>
    {isLoading && <div className={classes.user_skeleton}>
        <div></div>
        <p></p>
        </div>}
    {!users && !isLoading && <div style={{fontSize:"0.8rem"}}>No user found.</div>}
       
       {
        users?.map((user)=>{
            return  <div>
            <LazyImage src={user.Avatar || USER_FALLBACK}/>
            <p>{user.Name}</p>
          </div>
        })
       }
      </motion.div>}
    </div>
  );
};
export default SearchUser;
