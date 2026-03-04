"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "./services/useLogin";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { Button, Input } from "@sk-web-gui/react";
import Loading from "./components/LoadingSpinner";
import { PAGE_ROUTES } from "./constants";

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
        router.push(PAGE_ROUTES.dashboard);
      },
      onError: (error: AxiosError) => {
        console.log(error);
        setError(
          `Inloggningen misslyckades. ${
            error?.response?.data === "Incorrect password"
              ? t("errors.wrongPassword")
              : t("errors.wrongCredentials")
          }`,
        );
      },
    });
  };

  return isPending ? (
    <Loading />
  ) : (
    <div className="flex flex-col justify-center h-screen" data-cy="login">
      <div className="flex flex-col items-center gap-4 p-4">
        <h1>{t("welcomeMessage")}</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-16"
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
