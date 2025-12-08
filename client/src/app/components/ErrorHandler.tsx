import { AxiosError } from "axios";
import { Card } from "@sk-web-gui/react";

interface ErrorHandlerProps {
  error?: AxiosError;
}

const ErrorHandler = ({ error }: ErrorHandlerProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          <p color="secondary">{error ? error.message : "Error"}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ErrorHandler;
