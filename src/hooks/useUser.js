import { getUser } from '../api/user';
import { useQuery } from 'react-query';

const useUser = (userId="") => {
  
  const { data, isError, isLoading } = useQuery(["getUser", userId], () => getUser(userId));

  //console.log("data from useUser",data);
 
   const user=data?.user;

  return { user, isLoading, isError };
};

export default useUser;