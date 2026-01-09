import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { store } from "./redux/store.js";
import { AuthProvider } from "./Context/AuthContext.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  // </StrictMode>
);
