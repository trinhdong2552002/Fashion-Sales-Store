import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const customTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#E0E3E7",
          "--TextField-brandBorderHoverColor": "var(--border-color)",
          "--TextField-brandBorderFocusedColor": "black",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1.2rem",
          backgroundColor: "#121212",
          color: "white",
        },
      },
    },
  },
});

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
