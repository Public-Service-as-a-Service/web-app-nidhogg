"use client";

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
    <p>Laddar...</p>
  ) : (
    <div style={styles.loginMain} data-cy="login">
      <div style={styles.loginMainPaper}>
        <p style={{ fontSize: "1.5rem" }}>{t("welcomeMessage")}</p>
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
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder={t("passwordPlaceholder")}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button type="submit">{t("logInButton")}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
