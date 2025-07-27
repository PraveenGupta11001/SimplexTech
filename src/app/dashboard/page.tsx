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

  // Initialize client-side state
  useState(() => {
    setIsClient(true);
    if (typeof window !== "undefined" && !localStorage.getItem("isLoggedIn")) {
      router.replace("/login");
    }
  });

  if (!isClient) {
    return null; // Prevent server-client mismatch
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-gradient-to-b from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {currentUser ? `Welcome Back, ${currentUser.name || currentUser.email}!` : "Welcome Back!"}
          </h2>
          {isLoggedIn && currentUser ? (
            <UserCard user={currentUser} />
          ) : (
            <p className="text-red-500">Please log in to view your dashboard.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function UserCard({ user }: { user: { email: string; name?: string; joined: string } }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold">User Profile</h3>
      <div className="mt-2 space-y-2">
        <p>
          <span className="font-medium">Name:</span> {user.name || "N/A"}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Joined:</span>{" "}
          {new Date(user.joined).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}