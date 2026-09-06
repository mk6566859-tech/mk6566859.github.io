import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState(null);

  const showSnackbar = useCallback((message, type = "info") => {
    setSnackbar({ message, type });
    window.clearTimeout(showSnackbar.timer);
    showSnackbar.timer = window.setTimeout(() => setSnackbar(null), 3500);
  }, []);

  const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {snackbar && (
        <div className={`snackbar snackbar-${snackbar.type}`} role="status">
          <span>{snackbar.message}</span>
          <button
            type="button"
            aria-label="Close notification"
            onClick={() => setSnackbar(null)}
          >
            ×
          </button>
        </div>
      )}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used inside SnackbarProvider.");
  return context;
}
