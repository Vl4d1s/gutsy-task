import { CircularProgress, Container } from "@mui/material";

function Loader() {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensure the loader takes the full height of the viewport
      }}
    >
      <CircularProgress size={80} thickness={4} color="primary" />
    </Container>
  );
}

export default Loader;
