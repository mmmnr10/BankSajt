"use client";
import useLogin from "@/context/LoginContext";
import { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa"; // Import the email icon
import { BiLogIn } from "react-icons/bi";
import Link from "next/link";

export default function LoginPage() {
  const { isLogin, setIsLogin } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Add users (Sign Up)
  async function addUsers(e) {
    e.preventDefault();

    const newUser = { username, password, id: Date.now() };
    const newAccount = { userID: newUser.id, amount: 0 };

    // Add new user
    const respone = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    setUsername("");
    setPassword("");
    alert("Användare registrerad framgångsrikt");
  }

  // Handle sign in (Login)
  async function handleSignIn(e) {
    e.preventDefault();

    const user = { username, password };

    const response = await fetch("http://localhost:3001/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    localStorage.setItem("otp", data.otp);

    console.log("login data", data);
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <div className="md:w-[600px] mx-2 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Logga in" : "Registerera"}
          </h2>
          <p className="text-gray-500 mt-2">
            {isLogin
              ? "Välkommen tillbaka! Snälla skriv ner dina detaljer"
              : "Skapa ett konto för att starta"}
          </p>
        </div>

        <form onSubmit={isLogin ? handleSignIn : addUsers}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FaEnvelope className="inline-block mr-2" /> Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {isLogin ? "Logga in" : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Registrera -->" : "Har du redan ett konto?"}
            <button
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Logga in" : "Registrera dig"}
            </button>
          </p>
        </div>
      </div>
      <Link className="text-black" href="/account">
        Till kontosida
      </Link>
    </div>
  );
}
