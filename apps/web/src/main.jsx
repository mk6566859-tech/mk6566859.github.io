import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { SnackbarProvider } from "./presentation/providers/SnackbarProvider";
import { ErrorBoundary } from "./presentation/components/common/ErrorBoundary";
import "./presentation/styles/global.css";
import "./presentation/styles/admin.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SnackbarProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </SnackbarProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
