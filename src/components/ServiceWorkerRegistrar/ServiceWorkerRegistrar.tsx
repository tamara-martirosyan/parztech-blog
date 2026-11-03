"use client";

import { useEffect } from "react";

import { routes } from "@/lib/routes";

/** Installs public/sw.js, which adds offline reading to the installed app */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    // Skipped in dev, where cached pages would hide code changes
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    // The site works without it, so a failed install is only worth a log
    navigator.serviceWorker
      .register(routes.serviceWorker)
      .catch((error) =>
        console.error("Service worker registration failed", error),
      );
  }, []);

  return null;
}
