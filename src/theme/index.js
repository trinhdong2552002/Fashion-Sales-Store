import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

export const customTheme = createTheme({
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
        // Style for the 'contained' variant
        contained: {
          textTransform: "none",
          backgroundColor: "#121212",
          color: "white",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: "#333",
          },
        },
        // Style for the 'outlined' variant
        outlined: {
          textTransform: "none",
          backgroundColor: "white",
          fontSize: "1rem",
          color: "#121212",
          borderColor: "#d9d9d9",
          "&:hover": {
            backgroundColor: "#f9f9f9",
          },
        },
      },
    },
  },
});
