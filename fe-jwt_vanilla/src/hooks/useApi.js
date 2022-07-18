import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import instance from "../api/api";
import useAuth from "./useAuth";

const useApi = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.user?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.data?.message === "No refresh token") {
          window.localStorage.removeItem("userInfo");
          setAuth(null);
        }

        const prevRequest = error?.config;
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 401
        ) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          instance(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return instance;
};

export default useApi;
