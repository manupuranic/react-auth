import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const localStorageToken = localStorage.getItem("token");
  const [token, setToken] = useState(localStorageToken);

  const isLoggedIn = !!token;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("time");
    setToken(null);
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("time", Date.now());
    setToken(token);
    setTimeout(() => {
      console.log("logging out");
      logout();
    }, 5 * 60 * 1000);
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
