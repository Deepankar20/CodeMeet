"use client";

import React from "react";
import SocketProvider from "@/hooks/SocketContext";
import { ClerkProvider } from "@clerk/clerk-react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    
      <SocketProvider>{children}</SocketProvider>
    
  );
}
