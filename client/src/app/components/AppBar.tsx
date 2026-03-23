"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "../services/useLogout";
import { PAGE_ROUTES, PATHS, tailwindBreakPoint } from "../constants";
import { useState } from "react";
import Link from "next/link";
import { isProtectedPage } from "@/middleware";
import { useTranslations } from "next-intl";
import { Button, List, Logo, NavigationBar } from "@sk-web-gui/react";
import { Rows3, LogOut, X, Home, Send, Users } from "lucide-react";
import { useScreenWidth } from "../hooks/useScreenWidth";

const pathIcons: Record<string, React.ReactNode> = {
  [PAGE_ROUTES.dashboard]: <Home size={20} />,
  [PAGE_ROUTES.dashboardMessages]: <Send size={20} />,
  [PAGE_ROUTES.dashboardGroups]: <Users size={20} />,
};

const AppBarHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const t = useTranslations("AppBar");
  const screenWidth = useScreenWidth();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => router.push(PAGE_ROUTES.home),
      onError: () => console.error("Logout failed."),
    });
  };

  if (!isProtectedPage(pathname)) return null;

  return (
    <>
      <header className="w-full top-0 z-50 shadow-50">
        <div className="mx-auto p-20 flex items-center justify-between">
          <div className="self-center">
            <Logo
              variant="service"
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
          {screenWidth < tailwindBreakPoint.LG ? (
            <Button iconButton={true} onClick={() => setOpen(true)}>
              <Rows3 />
            </Button>
          ) : (
            <NavigationBar className="flex flex-row gap-16">
              {PATHS.filter((p) => p.isVisible).map((path, i) => (
                <NavigationBar.Item key={i}>
                  <Link
                    href={path.url}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-8 py-16"
                  >
                    {pathIcons[path.url]}
                    <p className="pl-8">{path.title}</p>
                  </Link>
                </NavigationBar.Item>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleLogout}
              >
                <LogOut />
                {isPending ? t("loggingOut") : t("logOut")}
              </Button>
            </NavigationBar>
          )}
        </div>
      </header>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-[300px] h-full flex flex-col p-40 bg-[--sk-colors-background-content]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between py-20">
              <p className="text-h4-md">{t("menuButton")}</p>
              <Button
                onClick={() => setOpen(false)}
                aria-label={t("closeButton")}
                iconButton={true}
              >
                <X size={24} />
              </Button>
            </div>
            <List className="flex flex-col flex-1 overflow-y-auto">
              {PATHS.filter((p) => p.isVisible).map((path, i) => (
                <Link
                  key={i}
                  href={path.url}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-16 py-16"
                >
                  {pathIcons[path.url]}
                  <span>{path.title}</span>
                </Link>
              ))}
            </List>
            <div>
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                {isPending ? t("loggingOut") : t("logOut")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppBarHeader;
