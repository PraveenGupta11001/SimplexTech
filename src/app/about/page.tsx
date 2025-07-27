"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">About SimplerTech</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            SimplerTech is a modern web application built with Next.js, Tailwind CSS, and TypeScript. Our goal is to provide a seamless authentication and dashboard experience with a focus on scalability and user-friendly design.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button variant="default" className="bg-gray-200 hover:cursor-pointer hover:bg-gray-300">Contact Us</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}