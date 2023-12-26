import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import "./styles/index.css";
import Layout from "./components/Layout.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/http.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "./hooks/errorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* UseQuery provider */}
    <QueryClientProvider client={queryClient}>
      {/* Router provider */}
      <RouterProvider router={router}>
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      </RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
