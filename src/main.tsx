import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ScrollOnTop from "./utils/ScrollOnTop.tsx";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <Router>
        <ReactQueryDevtools initialIsOpen={true} />
        <ScrollOnTop />
        <App />
      </Router>
    </NextUIProvider>
  </QueryClientProvider>,
  // </React.StrictMode>,
);
