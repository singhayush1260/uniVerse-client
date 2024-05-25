import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.scss";
import store from "./store/store.js";
import ThemeProvider from "./component/theme-provider/ThemeProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import {AuthContextProvider} from "./context/AuthContext.jsx";
import ErrorBoundary from "./component/error-boundary/ErrorBoundary.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <AuthContextProvider>
         <ThemeProvider>
         <App/>
         </ThemeProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
