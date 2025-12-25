"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function useSilentRefresh() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.expires) return;

    const expiresAt = new Date(session.expires).getTime();
    const refreshAt = expiresAt - 5 * 60 * 1000;

    const timeout = setTimeout(() => {
      signIn("credentials", { redirect: false });
    }, refreshAt - Date.now());

    return () => clearTimeout(timeout);
  }, [session]);
}
