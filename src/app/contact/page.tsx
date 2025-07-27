"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required");
      return;
    }
    setError("");
    alert("Message sent! (Simulated)");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-50">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-gray-900 font-bold">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
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
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 focus:border-blue-700 focus:ring-blue-700 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className="mt-1 w-full border-1 border-gray-300 focus:border-blue-700 focus:ring-blue-700 rounded-md p-2"
                rows={4}
                required
              />
            </div>
            {error && <p className="text-red-700 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-800 transition-colors rounded-md py-2 px-4">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}