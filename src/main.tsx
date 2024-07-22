import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ScrollOnTop from "./utils/ScrollOnTop.tsx";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import React from "react";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Router>
          <ReactQueryDevtools initialIsOpen={true} />
          <ScrollOnTop />
          <App />
        </Router>
      </NextUIProvider>
    </QueryClientProvider>
    ,
  </React.StrictMode>,
);
