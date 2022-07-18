import instance from "../api/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await instance.get("/api/refresh", {
      withCredentials: true,
    });
    window.localStorage.setItem("userInfo", JSON.stringify(response.data));
    setAuth({ user: response.data });
    return response?.data?.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
