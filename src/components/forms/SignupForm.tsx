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
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    // Check for duplicate email (case-insensitive)
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      return "This email is already registered";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (@#$%^&*)";
    }
    return "";
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) {
      return "Confirm password is required";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
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

    // Validate all fields
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setErrors({ ...errors, general: "All fields are required" });
      setLoading(false);
      return;
    }

    // Validate email
    const emailError = validateEmail(form.email);
    if (emailError) {
      setErrors({ ...errors, email: emailError });
      setLoading(false);
      return;
    }

    // Validate password
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setErrors({ ...errors, password: passwordError });
      setLoading(false);
      return;
    }

    // Validate confirm password
    const confirmPasswordError = validateConfirmPassword(form.password, form.confirmPassword);
    if (confirmPasswordError) {
      setErrors({ ...errors, confirmPassword: confirmPasswordError });
      setLoading(false);
      return;
    }

    try {
      // Simulate signup
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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-gradient-to-b from-gray-50 to-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {errors.general}
              </p>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-200 hover:cursor-pointer hover:bg-gray-300"
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