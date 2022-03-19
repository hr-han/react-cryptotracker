import React from "react";
import ReactDOM from "react-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

// react query 사용 위해
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
