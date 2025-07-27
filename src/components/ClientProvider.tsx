"use client";

import { Provider } from "react-redux";
import userStore from "@/store/userStore";
import { ReactNode } from "react";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return <Provider store={userStore}>{children}</Provider>;
}