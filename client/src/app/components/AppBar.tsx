"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "../services/useLogout";
import { PAGE_ROUTES, PATHS } from "../constants";
import { useState } from "react";
import Link from "next/link";
import { isProtectedPage } from "@/middleware";
import { useTranslations } from "next-intl";
import { Button, List } from "@sk-web-gui/react";
import { Rows3, LogOut } from "lucide-react";
import useIsAdmin from "../hooks/useIsAdmin";

const AppBarHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const t = useTranslations("AppBar");
  const isAdmin = useIsAdmin();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => router.push(PAGE_ROUTES.home),
      onError: () => console.error("Logout failed."),
    });
  };

  if (!isProtectedPage(pathname)) return null;

  return (
    <>
      <header className="w-full top-0 z-50">
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
          <div className="absolute top-0 left-0 w-[300px] h-full p-24">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setOpen(false)}
            >
              {t("closeButton")}
            </Button>
            <List listStyle="stroke" className="pt-10">
              {isAdmin ? (
                <List.Item>
                  <List.Text>
                    <Link href={PAGE_ROUTES.dashboardAdmin} onClick={() => setOpen(false)}>
                      {t("adminLink")}
                    </Link>
                  </List.Text>
                </List.Item>
              ) : (
                PATHS.filter((p) => p.isVisible).map((path, i) => (
                  <List.Item key={i}>
                    <List.Text>
                      {path.isExternal ? (
                        <a href={path.url} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                          {path.title}
                        </a>
                      ) : (
                        <Link href={path.url} onClick={() => setOpen(false)}>
                          {path.title}
                        </Link>
                      )}
                    </List.Text>
                  </List.Item>
                ))
              )}
            </List>
          </div>
        </div>
      )}
    </>
  );
};

export default AppBarHeader;
