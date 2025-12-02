import { AxiosError } from "axios";

interface ErrorHandlerProps {
  error?: AxiosError;
}

const ErrorHandler = ({ error }: ErrorHandlerProps) => {
  return (
    <div>
      <p color="secondary">{error ? error.message : "Error"}</p>
    </div>
  );
};

export default ErrorHandler;
