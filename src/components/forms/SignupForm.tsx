"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setUser } from "@/features/authSlice";
import { RootState } from "@/store/userStore";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.auth.users);

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) return "This email is already registered";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/\d/.test(password)) return "Password must contain at least one number";
    if (!/[@#$%^&*]/.test(password)) return "Password must contain at least one special character (@#$%^&*)";
    return "";
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return "Confirm password is required";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setErrors({ ...errors, email: validateEmail(value) });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value),
        confirmPassword: validateConfirmPassword(value, form.confirmPassword),
      });
    } else if (name === "confirmPassword") {
      setErrors({ ...errors, confirmPassword: validateConfirmPassword(form.password, value) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "", confirmPassword: "", general: "" });
    setLoading(true);

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrors({ ...errors, general: "All fields are required" });
      setLoading(false);
      return;
    }

    const emailError = validateEmail(form.email);
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setErrors({ ...errors, password: passwordError });
      setLoading(false);
      return;
    }

    const confirmPasswordError = validateConfirmPassword(form.password, form.confirmPassword);
    if (confirmPasswordError) {
      setErrors({ ...errors, confirmPassword: confirmPasswordError });
      setLoading(false);
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 1000));
      dispatch(setUser({ name: form.name, email: form.email }));
      setLoading(false);
      router.replace("/dashboard");
      router.refresh();
    } catch (err: any) {
      setErrors({ ...errors, general: "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-50">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-gray-900 font-bold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <p className="text-red-700 text-sm text-center bg-red-50 p-2 rounded-lg">
                {errors.general}
              </p>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 focus:border-blue-700 focus:ring-blue-700 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 focus:border-blue-700 focus:ring-blue-700 rounded-md p-2"
                required
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-700 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 focus:border-blue-700 focus:ring-blue-700 rounded-md p-2"
                required
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-red-700 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 focus:border-blue-700 focus:ring-blue-700 rounded-md p-2"
                required
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-red-700 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-700 text-white hover:bg-blue-800 transition-colors rounded-md py-2 px-4"
              disabled={loading || !!errors.email || !!errors.password || !!errors.confirmPassword}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}