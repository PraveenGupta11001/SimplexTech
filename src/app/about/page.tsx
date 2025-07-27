"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-50">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-gray-900 font-bold">About SimplerTech</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-700">
            SimplerTech is a modern web application built with Next.js, Tailwind CSS, and TypeScript. Our goal is to provide a seamless authentication and dashboard experience with a focus on scalability and user-friendly design.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button variant="default" className="bg-blue-700 text-white hover:bg-blue-800 transition-colors rounded-md py-2">
                Contact Us
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}