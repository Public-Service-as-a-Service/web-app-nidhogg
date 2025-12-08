"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "../services/useLogout";
import { PATHS } from "../constants";
import { useState } from "react";
import Link from "next/link";
import { isProtectedPage } from "@/middleware";
import { useTranslations } from "next-intl";
import { Button, List } from "@sk-web-gui/react";
import { Rows3, LogOut } from "lucide-react";

const AppBarHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const t = useTranslations("AppBar");

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => router.push("/"),
      onError: () => console.error("Logout failed."),
    });
  };

  if (!isProtectedPage(pathname)) return null;

  return (
    <>
      <header className="w-full top-0 left-0 z-50 shadow">
        <div className="mx-auto p-20 flex items-center align-center justify-between">
          <Button onClick={() => setOpen(true)}>
            {t("menuButton")} <Rows3 />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleLogout}
          >
            {isPending ? t("loggingOut") : t("logOut")} <LogOut />
          </Button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40">
          <div className="absolute top-0 left-0 w-[300px] h-full shadow-xl p-24">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setOpen(false)}
            >
              {t("closeButton")}
            </Button>
            <List listStyle="bullet">
              {PATHS.filter((p) => p.isVisible).map((path, i) => (
                <List.Item key={i}>
                  <List.Text>
                    <Link href={path.url} onClick={() => setOpen(false)}>
                      {path.title}
                    </Link>
                  </List.Text>
                </List.Item>
              ))}
            </List>
          </div>
        </div>
      )}
    </>
  );
};

export default AppBarHeader;
