import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

const useLoading = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  return { isLoading, setIsLoading };
};

export default useLoading;
