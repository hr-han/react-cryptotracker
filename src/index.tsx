import React from "react";
import ReactDOM from "react-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { RecoilRoot } from "recoil";
import App from "./App";

// react query 사용 위해
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
