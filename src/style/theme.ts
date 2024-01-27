import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "bold",
          fontSize: "1rem",
          backgroundColor: "#3f51b5",
          color: "white",
          textAlign: "center",
          height: "50px",
        },
        body: {
          textAlign: "center",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#f5f5f5",
          },
          "&:nth-of-type(even)": {
            backgroundColor: "#ffffff",
          },
          "&:hover": {
            backgroundColor: "#dbf6ff",
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          minWidth: "650px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#3f51b5",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "40%",
        },
      },
    },
  },
});
