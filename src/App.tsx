import React, { useEffect } from "react";
import { useAuthServiceWorker } from "./lib/hook";

function App() {
  const { initialized } = useAuthServiceWorker({
    headers: {
      Authorization: "Bearer eyhh",
    },
  });

  return <div>{initialized && <ApiCall />}</div>;
}

function ApiCall() {
  useEffect(() => {
    fetch("/index.html");
  }, []);

  return <>Api call</>;
}

export default App;
