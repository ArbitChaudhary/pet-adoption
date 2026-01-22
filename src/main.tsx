import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import Providers from "./providers.tsx";
import StoreProvider from "./redux/store-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <Providers>
        <App />
      </Providers>
    </StoreProvider>
  </StrictMode>,
);
