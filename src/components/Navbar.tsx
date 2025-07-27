"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { RootState } from "@/store/userStore";
import { clearUser } from "@/features/authSlice";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useState(() => {
    setIsClient(true);
  });

  const handleLogout = () => {
    dispatch(clearUser());
    window.location.href = "/login";
  };

  if (!isClient) {
    return null;
  }

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl tracking-tight">
          SimplerTech
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-blue-800 hover:text-white transition-colors">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="text-white hover:bg-blue-800 hover:text-white transition-colors">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="text-white hover:bg-blue-800 hover:text-white transition-colors">
              Contact
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-blue-800 hover:text-white transition-colors">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-white text-black hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-colors"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="outline" className="border-white text-black hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-colors">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-white text-black hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-colors">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-4 bg-blue-700 p-4 rounded-lg">
          <Link href="/">
            <Button variant="ghost" className="w-full text-white hover:bg-blue-800 hover:text-white transition-colors">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="w-full text-white hover:bg-blue-800 hover:text-white transition-colors">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="w-full text-white hover:bg-blue-800 hover:text-white transition-colors">
              Contact
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full text-white hover:bg-blue-800 hover:text-white transition-colors">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full border-white text-black hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-colors"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="outline" className="w-full border-white text-black hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-colors">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full border-white text-black hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-colors">
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