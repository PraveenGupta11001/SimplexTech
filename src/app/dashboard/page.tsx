"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
      <p className="mt-4">You are logged in.</p>
    </div>
  );
}
