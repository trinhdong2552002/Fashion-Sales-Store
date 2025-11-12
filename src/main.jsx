import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { customTheme } from "./theme/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
