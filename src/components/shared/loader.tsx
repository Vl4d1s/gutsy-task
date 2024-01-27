import { CircularProgress, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress size={80} thickness={4} color="primary" />
    </Container>
  );
};

export default Loader;
