import { Box, Typography } from "@mui/material";
import { AxiosError } from "axios";

interface ErrorHandlerProps {
  error?: AxiosError;
}

const ErrorHandler = ({ error }: ErrorHandlerProps) => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} m={2}>
      <Typography variant='h2' color='secondary'>
        {error ? error.message : "Error"}
      </Typography>
    </Box>
  );
};

export default ErrorHandler;
