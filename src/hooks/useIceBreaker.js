import { useState } from "react";
import { useQuery } from "react-query";
import { getIceBreaker } from "../api/chat";
const useIceBreaker = (userId,{postFetch,onError}) => {
  const [iceBreakers, setIceBreakers] = useState([]);
  const { error, isLoading, refetch, isFetching } = useQuery(
    ["getIceBreaker", userId],
    () => getIceBreaker(userId),
    {
      enabled: false,
      onSuccess: (data) => {
        // console.log("ice breakeer data",data);
        // console.log("efsfrgreg",data?.text[0]?.split(","));
        setIceBreakers(data?.text[0]?.trim()?.split("\n"));
        postFetch();
      },
      onError
    }
  );

  return {
    iceBreakers,
    fetchIceBreakers: refetch,
    fetchingIceBreakers: isFetching,
    error,
    iceBreakersLoading: isLoading,
  };
};
export default useIceBreaker;
