import React, { useEffect, useState } from "react";
import { AuthConfig } from "./type";

export function useAuthServiceWorker(config: AuthConfig) {
  const [health, setHealth] = useState<{
    initialized: boolean;
    error?: Error;
  }>({
    initialized: false,
  });

  useEffect(() => {
    const startServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        return navigator.serviceWorker.register("/serviceWorker.js", {
          scope: "/",
        });
      }
    };

    startServiceWorker()
      .then(async () => {
        navigator.serviceWorker.controller?.postMessage({
          type: "CONFIG",
          payload: config,
        });

        setHealth({
          initialized: true,
        });
      })
      .catch((error) => {
        setHealth({ initialized: false, error });
      });
  }, []);

  return health;
}
