import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimplerTech UI",
  description: "A scalable Next.js app with authentication and dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)]`}>
        <ClientProvider>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}