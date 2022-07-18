import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const Profile = () => {
  const [data, setData] = useState(null);
  const instance = useApi();

  useEffect(() => {
    const getProfile = async () => {
      const response = await instance("/api/profile");
      setData(response.data);
    };

    getProfile();
  }, []);

  return <div>{data ? data?.message : "Loading"}</div>;
};

export default Profile;
