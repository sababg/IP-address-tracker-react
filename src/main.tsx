import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/utils/ErrorBoundary.tsx";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={(error, reset) => (
        <div>
          <h2>Failed to load data</h2>
          <p>{error.message}</p>
          <button onClick={reset}>Retry</button>
        </div>
      )}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
