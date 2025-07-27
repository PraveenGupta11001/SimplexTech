"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-[var(--primary)] text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          SimplerTech
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <Button variant="ghost" className="text-black hover:cursor-pointer hover:bg-gray-100">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="text-black hover:cursor-pointer hover:bg-gray-100">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="text-black hover:cursor-pointer hover:bg-gray-100">
              Contact
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-black hover:cursor-pointer hover:bg-gray-100">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" className="hover:cursor-pointer hover:bg-gray-100" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="outline" className="hover:cursor-pointer hover:bg-gray-100">Sign Up</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="hover:cursor-pointer hover:bg-gray-100">Login</Button>
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-4">
          <Link href="/">
            <Button variant="ghost" className="w-full text-black hover:cursor-pointer hover:bg-gray-100">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="w-full text-black hover:cursor-pointer hover:bg-gray-100">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="w-full text-black hover:cursor-pointer hover:bg-gray-100">
              Contact
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full text-black hover:cursor-pointer hover:bg-gray-100">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="outline" className="w-full">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}