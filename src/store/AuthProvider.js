import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const localStorageToken = localStorage.getItem("token");
  const [token, setToken] = useState(localStorageToken);

  const isLoggedIn = !!token;

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const authCtx = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
