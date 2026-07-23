"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { login } from "../services/auth.service";

import { useAuthStore } from "@/store/auth.store";

import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  return useMutation({
    mutationFn: login,

    onSuccess(response) {
      console.log("LOGIN RESPONSE:", response);

      setAuth(
        response.token,
        response.user
      );

      toast.success("Login successful.");

      router.replace("/dashboard");
    },

    onError(error: any) {
      console.error("LOGIN ERROR:", error);
      console.error("LOGIN RESPONSE:", error?.response?.data);

      toast.error(
        error?.response?.data?.message ??
        "Unable to login."
      );
    },
  });
}