"use client";

import { InteractionsProvider } from "@/context/InteractionsContext";

export default function ClientWrapper({ children }) {
  return (
    <InteractionsProvider>
      {children}
    </InteractionsProvider>
  );
}
