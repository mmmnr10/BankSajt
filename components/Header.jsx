"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";
import { useState } from "react";
import { BiLogIn } from "react-icons/bi";
import useLogin from "@/context/LoginContext";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLogin } = useLogin();

  function handleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <nav className="bg-blue-950 text-white shadow-lg">
      {/* Main Navigation */}
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-semibold hover:opacity-80 transition duration-200"
        >
          <span>Globen Bank</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Kontakta oss
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Konto
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Överföring
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Hjälp
            </Link>
          </li>
          <li>
            <Link
              href="/login-page"
              onClick={() => setIsLogin(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition"
            >
              <BiLogIn className="inline-block mr-2" />
              Logga In
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="text-3xl md:hidden" onClick={handleMenu}>
          <RxHamburgerMenu />
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 w-64 min-h-screen bg-blue-950 text-white shadow-xl p-6 transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end text-3xl">
          <button onClick={handleMenu}>
            <TfiClose />
          </button>
        </div>

        <ul className="flex flex-col items-start gap-6 text-xl font-medium mt-8">
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Kontakta oss
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Konto
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-400 transition">
              Överför
            </Link>
          </li>
          <li className="border-b pb-6">
            <Link href="/" className="hover:text-blue-400 transition">
              Hjälp
            </Link>
          </li>
          <li>
            <Link
              href="/login-page"
              onClick={() => setIsLogin(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-blue-400 transition"
            >
              <BiLogIn />
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
