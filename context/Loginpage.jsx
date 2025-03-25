// components/LoginPage.jsx
"use client";

import React, { useState } from "react";
import { useLogin } from "@/context/LoginContext";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
    router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Uppdatera användarnamn i state
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Uppdatera lösenord i state
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Log In
        </button>
      </form>

      <Link href={"/accounts?otp=" + otp}>Till min konto sida</Link>
    </div>
  );
};

export default LoginPage;
