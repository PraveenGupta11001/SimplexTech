"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/store/userStore";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const currentUser = useSelector((state: RootState) =>
    state.auth.users.find((user) => user.email === state.auth.currentUserEmail)
  );

  useState(() => {
    setIsClient(true);
  });

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-[50vh]">
        <Card className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-4xl text-center text-blue-700 font-bold">
              Welcome to SimplerTech
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-lg text-gray-800">
              {isLoggedIn && currentUser
                ? `Welcome back, ${currentUser.name || currentUser.email}!`
                : "Experience modern authentication and a seamless dashboard."}
            </p>
            <p className="text-base text-gray-600">
              SimplerTech offers secure login, persistent user data with localStorage, and a scalable Next.js app with Redux state management.
            </p>
            {!isLoggedIn && (
              <div className="flex justify-center gap-4">
                <Link href="/login">
                  <Button className="bg-blue-700 text-white hover:bg-blue-800 transition-colors rounded-md py-2 px-4">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-md py-2 px-4">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white shadow-md rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Secure Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Robust login system with Redux and localStorage for persistent sessions.</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Scalable Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Access your personalized dashboard with user data and insights.</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-lg p-4">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Responsive Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Seamless experience across desktop and mobile devices.</p>
          </CardContent>
        </Card>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">What Our Users Say</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardContent className="pt-6">
              <p className="italic text-gray-600">"SimplerTech made managing my account so easy and secure!"</p>
              <p className="mt-2 font-medium text-gray-800">— Jane Doe</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardContent className="pt-6">
              <p className="italic text-gray-600">"The dashboard is intuitive, and I love the clean design."</p>
              <p className="mt-2 font-medium text-gray-800">— John Smith</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900">Our Impact</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white shadow-md rounded-lg p-4 text-center">
            <CardContent className="pt-6">
              <p className="text-4xl font-bold text-blue-700">10K+</p>
              <p className="text-gray-600">Users Registered</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md rounded-lg p-4 text-center">
            <CardContent className="pt-6">
              <p className="text-4xl font-bold text-teal-600">99.9%</p>
              <p className="text-gray-600">Uptime</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md rounded-lg p-4 text-center">
            <CardContent className="pt-6">
              <p className="text-4xl font-bold text-green-600">100%</p>
              <p className="text-gray-600">User Satisfaction</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}