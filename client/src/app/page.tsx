"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "./services/useLogin";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { Button, Input } from "@sk-web-gui/react";
import Loading from "./components/LoadingSpinner";
import { PAGE_ROUTES, SESSION_STORAGE } from "./constants";
import { LogIn } from "lucide-react";

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
        const role = sessionStorage.getItem(SESSION_STORAGE.userRole);
        router.push(role === "ADMIN" ? PAGE_ROUTES.dashboardAdmin : PAGE_ROUTES.dashboard);
      },
      onError: (error: AxiosError) => {
        console.log(error);
        const data = error?.response?.data as { detail?: string } | string | undefined;
        const detail = typeof data === "object" ? data?.detail : data;
        if (detail === "Account suspended") {
          setError(t("errors.suspended"));
        } else if (detail === "Account inactive") {
          setError(t("errors.inactive"));
        } else if (detail === "Incorrect password") {
          setError(`Inloggningen misslyckades. ${t("errors.wrongPassword")}`);
        } else {
          setError(`Inloggningen misslyckades. ${t("errors.wrongCredentials")}`);
        }
      },
    });
  };

  return isPending ? (
    <Loading />
  ) : (
    <div
      className="min-h-screen px-20 pt-100 pb-40 md:pt-[130px]"
      data-cy="login"
    >
      <div className="mx-auto flex min-h-full w-full max-w-[300px] lg:max-w-[500px] flex-col">
        <div className="mb-40">
          <h1 className="text-h2-sm md:text-h2-lg lg:text-h1-lg">{t("welcomeHeading")}</h1>
          <p className="md:text-large lg:text-h3-sm">{t("welcomeMessage")}</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-1 flex-col gap-16">
          {error && <div>{error}</div>}
          <div className="flex flex-col w-full">
            <p className="text-label-large">{t("emailPlaceholder")}</p>
            <Input
              type="email"
              placeholder={t("emailPlaceholder")}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="text-label-large">{t("passwordPlaceholder")}</p>
            <Input
              type="password"
              placeholder={t("passwordPlaceholder")}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <div className="mt-auto flex justify-end pt-80">
            <Button type="submit" size="lg">
              {t("logInButton")} <LogIn />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
