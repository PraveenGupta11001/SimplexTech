"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setUser } from "@/features/authSlice";
import { RootState } from "@/store/userStore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidTxt, setInvalidTxt] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.auth.users);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      dispatch(setUser({ email, name: existingUser?.name }));
      setLoading(false);
      router.replace("/dashboard");
      router.refresh();
    } else {
      setError("Invalid credentials or user doesn't exist!");
      setInvalidTxt(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-gradient-to-b from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {invalidTxt && (
              <div className="bg-red-100 text-red-700 p-3 rounded flex justify-between items-center text-sm">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setInvalidTxt(false)}
                  className="ml-4 text-lg font-bold leading-none hover:text-red-900"
                >
                  ×
                </button>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-200 hover:cursor-pointer hover:bg-gray-300"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
