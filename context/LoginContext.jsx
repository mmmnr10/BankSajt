"use client";
import { useContext, createContext, useState } from "react";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
}

export default function useLogin() {
  return useContext(LoginContext);
}
