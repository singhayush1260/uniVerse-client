import { getUser } from '../api/user';
import { useQuery } from 'react-query';

const useUser = (userId="",queryKey="getCurrentUser") => {
  const { data, isError, isLoading } = useQuery([queryKey, userId], () => getUser(userId));
  // console.log("data from useUser",data);
  // console.log("friend",data?.isFriend)
  return { user:data?.user,isFriend:data?.isFriend,friend:data?.friendObj, isLoading, isError };
};

export default useUser;