"use client";

import { SessionProvider } from "next-auth/react";
import SessionWatcher from "components/SessionWatcher";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <SessionWatcher />
      {children}
    </SessionProvider>
  );
}
