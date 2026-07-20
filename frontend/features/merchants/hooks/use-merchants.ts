"use client";

import { useQuery } from "@tanstack/react-query";

import { getMerchants } from "../services/merchant.service";

export function useMerchants() {
  return useQuery({
    queryKey: ["merchants"],
    queryFn: () => getMerchants(),
  });
}