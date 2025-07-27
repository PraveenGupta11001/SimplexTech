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
    <nav className="bg-[var(--primary)] text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          SimplerTech
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <Button variant="ghost" className="text-black hover:cursor-pointer hover:bg-gray-200">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="text-black hover:cursor-pointer hover:bg-gray-200">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="text-black hover:cursor-pointer hover:bg-gray-200">
              Contact
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-black hover:cursor-pointer hover:bg-gray-200">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                className="hover:cursor-pointer hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="outline" className="hover:cursor-pointer hover:bg-gray-200">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="hover:cursor-pointer hover:bg-gray-200">
                  Login
                </Button>
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
            <Button variant="ghost" className="w-full text-black hover:cursor-pointer hover:bg-gray-200">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="w-full text-black hover:cursor-pointer hover:bg-gray-200">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="w-full text-black hover:cursor-pointer hover:bg-gray-200">
              Contact
            </Button>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full text-black hover:cursor-pointer hover:bg-gray-200">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full hover:cursor-pointer hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="outline" className="w-full hover:cursor-pointer hover:bg-gray-200">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full hover:cursor-pointer hover:bg-gray-200">
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