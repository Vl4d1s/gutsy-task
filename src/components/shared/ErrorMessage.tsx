import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

interface ErrorMessage {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessage) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Alert severity="error">{message}</Alert>
    </Box>
  );
};

export default ErrorMessage;
