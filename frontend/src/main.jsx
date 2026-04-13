import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
window.__TANSTACK_QUERY_CLIENT__ = queryClient
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Toaster/>
    <App />
  </QueryClientProvider>,
);
