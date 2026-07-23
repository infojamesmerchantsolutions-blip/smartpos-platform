"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export default function TestAuthPage() {
  const { user, token } = useAuthStore();

  useEffect(() => {
    console.log("USER:", user);
    console.log("TOKEN:", token);
    console.log(
      "STORAGE:",
      localStorage.getItem("smartpos-auth")
    );
  }, [user, token]);

  return (
    <main className="p-10 space-y-4">
      <h1 className="text-3xl font-bold">
        Authentication Test
      </h1>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <pre>{token}</pre>
    </main>
  );
}