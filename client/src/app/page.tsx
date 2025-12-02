"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "./services/useLogin";
import { styles } from "./styles";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { Button, Input, Spinner } from "@sk-web-gui/react";

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
    <div className="self-center">
      <Spinner />
    </div>
  ) : (
    <div style={styles.loginMain} data-cy="login">
      <div style={styles.loginMainPaper}>
        <h1>{t("welcomeMessage")}</h1>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          {error && <div>{error}</div>}
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder={t("passwordPlaceholder")}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button type="submit">{t("logInButton")}</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
