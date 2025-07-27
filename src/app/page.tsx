"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl text-center text-[var(--primary)]">
            Welcome to SimplerTech
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-lg">
            A modern authentication and dashboard app
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button variant="default" className="bg-gray-100 hover:cursor-pointer hover:bg-gray-300">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="bg-gray-100 hover:cursor-pointer hover:bg-gray-300">Signup</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}