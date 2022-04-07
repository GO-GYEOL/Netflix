import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme } from "./theme";


document.cookie = "safeCookie1foo; SameSite=Lax";
document.cookie = "safeCookie1foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure";


const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      
        <App />
      
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
