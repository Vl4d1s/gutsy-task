import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "bold",
          backgroundColor: "#3f51b5",
          color: "white",
          textAlign: "center",
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
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#3f51b5",
        },
      },
    },
  },
});
