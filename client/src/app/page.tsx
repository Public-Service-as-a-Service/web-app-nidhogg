"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "./services/useLogin";
import { styles } from "./styles";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

export type Credentials = {
  email: string;
  password: string;
};

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const t = useTranslations("LogIn");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    mutate(credentials, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error: AxiosError) => {
        console.log(error);
        setError(
          `Inloggningen misslyckades. ${
            error?.response?.data === "Incorrect password"
              ? t("errors.wrongPassword")
              : t("errors.wrongCredentials")
          }`
        );
      },
    });
  };

  return isPending ? (
    <CircularProgress color="secondary" />
  ) : (
    <Box component={"main"} sx={styles.loginMain} data-cy="login">
      <Paper sx={styles.loginMainPaper}>
        <Typography variant="h1" sx={{ fontSize: "1.5rem" }}>
          {t("welcomeMessage")}
        </Typography>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          {error && (
            <Alert sx={{ border: "1px solid" }} severity="error">
              {error}
            </Alert>
          )}
          <TextField
            type="email"
            variant="outlined"
            placeholder={t("emailPlaceholder")}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <TextField
            type="password"
            variant="outlined"
            placeholder={t("passwordPlaceholder")}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button type="submit" variant="contained">
            {t("logInButton")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
