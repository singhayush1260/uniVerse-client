import classes from "./SearchUser.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { motion,AnimatePresence } from "framer-motion";
import LazyImage from "../../lazy-image/LazyImage";
import useDebounce from "../../../hooks/useDebounce";
import { searchCommunityUser } from "../../../api/user";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
const SearchUser = ({currentUser}) => {
  const navigate=useNavigate();
  const [searchParam, setSearchParam] = useState("");
  const isSeaching = searchParam.length > 0;
  const { data, isLoading, refetch } = useQuery(["searchCommunityUser", searchParam], () => searchCommunityUser(searchParam),{ enabled: false,});
  //console.log("users from search users",data);
  const debouncedSearch = searchParam.length>0 && useDebounce(refetch, 1000);
  const filteredUsers=!data?.communityUsers && data?.filter((user)=>user?._id!==currentUser?._id);
  //console.log("filtered users",filteredUsers)
  return (
    <div className={classes.search_user}>
      <input
        type="text"
        placeholder="Search.."
        value={searchParam}
        onKeyUp={(e) => debouncedSearch(e)}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <AnimatePresence>
      {isSeaching && (
        <motion.div
          className={classes.search_result}
          initial={{ y: "-40px" }}
          animate={{ y: "-5px" }}
          exit={{ y: "-250px" }}
          transition={{ duration: 0.5 }}
        >
          {isLoading && (
            <div className={classes.user_skeleton}>
              <div></div>
              <p></p>
            </div>
          )}
          {!filteredUsers && !isLoading && (
            <div style={{ fontSize: "0.8rem" }}>No user found.</div>
          )}

          {filteredUsers?.map((user) => {
            return (
              <div key={user?._id} onClick={()=>navigate(`/user/${user?.Username}`, { state: { user } })}>
                <LazyImage src={user.Avatar || USER_FALLBACK} />
                <p>{user?.Name||user?.Username}</p>
              </div>
            );
          })}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};
export default SearchUser;
