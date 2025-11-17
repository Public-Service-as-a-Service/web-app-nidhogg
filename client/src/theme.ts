"use client";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7e34a8",
    },
    error: {
      main: "#ff3dbe",
    },
    text: {
      primary: "#efcbff",
      secondary: "#efcbff",
    },
  },
  typography: {
    fontFamily: '"Asap", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#1b0028",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#560087",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.66rem",
          borderRadius: 20,
          padding: "6px 16px",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "#7e34a8",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#efcbff",
            borderRadius: 4,
            boxShadow: "0 0 4px rgba(0,0,0,0.75)",
          },
        },
      },
    },
  },
});
