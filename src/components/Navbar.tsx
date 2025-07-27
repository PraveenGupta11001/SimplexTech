"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        SimplerTech
      </Link>
      <div className="space-x-4">
        {!isLoggedIn && (
          <>
            <Link href='/home'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='/contact'>Contact</Link>
            <Link href="/signup">Sign Up</Link>
            <Link href="/login">Login</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link href='/home'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='/contact'>Contact</Link>
            <Link href="/dashboard">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
