import axios from "../axiosApi/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh");
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response?.data?.accessToken,
          uuid: response?.data?.uuid,
          userId: response?.data?.userId,
          username: response?.data?.username,
        };
      });
      return response?.data?.accessToken;
    } catch (err) {
      console.log(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
