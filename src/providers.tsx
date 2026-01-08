import { ThemeProvider } from "@mui/material/styles";
import type React from "react";
import theme from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={theme} defaultMode="light">
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default Providers;
