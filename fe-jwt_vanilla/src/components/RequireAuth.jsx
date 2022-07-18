import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
