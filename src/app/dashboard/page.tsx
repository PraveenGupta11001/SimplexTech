"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/store/userStore";

export default function Dashboard() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const currentUser = useSelector((state: RootState) =>
    state.auth.users.find((user) => user.email === state.auth.currentUserEmail)
  );

  useState(() => {
    setIsClient(true);
    if (typeof window !== "undefined" && !localStorage.getItem("isLoggedIn")) {
      router.replace("/login");
    }
  });

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-50">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-gray-900 font-bold">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {currentUser ? `Welcome Back, ${currentUser.name || currentUser.email}!` : "Welcome Back!"}
          </h2>
          {isLoggedIn && currentUser ? (
            <UserCard user={currentUser} />
          ) : (
            <p className="text-red-700 text-center">Please log in to view your dashboard.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function UserCard({ user }: { user: { email: string; name?: string; joined: string } }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">User Profile</h3>
      <div className="mt-2 space-y-2">
        <p>
          <span className="font-medium text-gray-600">Name:</span> {user.name || "N/A"}
        </p>
        <p>
          <span className="font-medium text-gray-600">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium text-gray-600">Joined:</span>{" "}
          {new Date(user.joined).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}