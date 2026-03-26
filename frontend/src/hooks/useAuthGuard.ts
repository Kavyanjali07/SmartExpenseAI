"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type AuthGuardState = {
  isChecking: boolean;
  isAuthenticated: boolean;
};

export function isAuthenticatedClient() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(localStorage.getItem("token"));
}

export function logoutClient() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}

export function useAuthGuard(redirectTo = "/login"): AuthGuardState {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setIsChecking(false);

      if (pathname !== redirectTo) {
        router.replace(redirectTo);
      }
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  }, [pathname, redirectTo, router]);

  return { isChecking, isAuthenticated };
}
