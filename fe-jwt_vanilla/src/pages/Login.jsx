import React, { useState, useEffect } from "react";
import instance from "../api/api";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (!auth?.user) return;
    navigate(location?.state ? location?.state?.from?.pathname : "/");
  }, [auth]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post("/api/login", {
        username,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setAuth({ user: data });
    } catch (e) {}
  };

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        placeholder="Input username"
      />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        placeholder="Input password"
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
