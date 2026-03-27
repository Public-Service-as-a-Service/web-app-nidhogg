"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "../services/useLogout";
import {
  API_ENDPOINTS,
  PAGE_ROUTES,
  PATHS,
  tailwindBreakPoint,
} from "../constants";
import { useState } from "react";
import Link from "next/link";
import { isProtectedPage } from "@/middleware";
import { useTranslations } from "next-intl";
import { Button, List, Logo, NavigationBar } from "@sk-web-gui/react";
import {
  Rows3,
  LogOut,
  X,
  Home,
  Send,
  Users,
  MessageCircle,
  UserStar,
} from "lucide-react";
import { useScreenWidth } from "../hooks/useScreenWidth";
import useIsAdmin from "../hooks/useIsAdmin";

const pathIcons: Record<string, React.ReactNode> = {
  [PAGE_ROUTES.dashboard]: <Home size={20} />,
  [PAGE_ROUTES.dashboardMessages]: <Send size={20} />,
  [PAGE_ROUTES.dashboardGroups]: <Users size={20} />,
  [API_ENDPOINTS.msLogin]: <MessageCircle size={20} />,
  [PAGE_ROUTES.dashboardAdmin]: <UserStar size={20} />,
};

const AppBarHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const t = useTranslations("AppBar");
  const screenWidth = useScreenWidth();
  const isAdmin = useIsAdmin();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => router.push(PAGE_ROUTES.home),
      onError: () => console.error("Logout failed."),
    });
    setOpen(false);
  };

  if (!isProtectedPage(pathname)) return null;

  const getTeamsSenderLinkProps = (url: string) => {
    let target: "_blank" | undefined;
    let rel: "noreferrer" | undefined;

    if (url === API_ENDPOINTS.msLogin) {
      target = "_blank";
      rel = "noreferrer";
    }

    return { target, rel };
  };

  let desktopNavigation: React.ReactNode = null;

  if (screenWidth < tailwindBreakPoint.XL) {
    desktopNavigation = (
      <Button iconButton={true} onClick={() => setOpen(true)} data-cy="menu">
        <Rows3 />
      </Button>
    );
  } else {
    let desktopMenuItems: React.ReactNode = null;

    if (isAdmin) {
      desktopMenuItems = (
        <NavigationBar.Item>
          <Link
            href={PAGE_ROUTES.dashboardAdmin}
            onClick={() => setOpen(false)}
            className="flex items-center gap-8 py-16"
          >
            <UserStar size={20} />
            <p className="pl-8">{t("adminLink")}</p>
          </Link>
        </NavigationBar.Item>
      );
    } else {
      desktopMenuItems = PATHS.filter((p) => p.isVisible).map((path, i) => {
        const { target, rel } = getTeamsSenderLinkProps(path.url);

        return (
          <NavigationBar.Item key={i}>
            <Link
              href={path.url}
              onClick={() => setOpen(false)}
              className="flex items-center gap-8 py-16"
              target={target}
              rel={rel}
            >
              {pathIcons[path.url]}
              <p className="pl-8">{path.title}</p>
            </Link>
          </NavigationBar.Item>
        );
      });
    }

    desktopNavigation = (
      <NavigationBar className="flex flex-row gap-16">
        {desktopMenuItems}
        <NavigationBar.Item>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleLogout}
          >
            <LogOut />
            {isPending ? t("loggingOut") : t("logOut")}
          </Button>
        </NavigationBar.Item>
      </NavigationBar>
    );
  }

  let mobileMenuContent: React.ReactNode = null;

  if (isAdmin) {
    mobileMenuContent = (
      <Link
        href={PAGE_ROUTES.dashboardAdmin}
        onClick={() => setOpen(false)}
        className="flex items-center gap-16 py-16"
      >
        <UserStar size={20} />
        <span>{t("adminLink")}</span>
      </Link>
    );
  } else {
    mobileMenuContent = PATHS.filter((p) => p.isVisible).map((path, i) => {
      if (path.isExternal) {
        const { target, rel } = getTeamsSenderLinkProps(path.url);

        return (
          <a
            key={i}
            href={path.url}
            target={target}
            rel={rel}
            onClick={() => setOpen(false)}
            className="flex items-center gap-16 py-16"
          >
            {pathIcons[path.url]}
            <span>{path.title}</span>
          </a>
        );
      }

      return (
        <Link
          key={i}
          href={path.url}
          onClick={() => setOpen(false)}
          className="flex items-center gap-16 py-16"
        >
          {pathIcons[path.url]}
          <span>{path.title}</span>
        </Link>
      );
    });
  }

  return (
    <>
      <header className="w-full top-0 z-50 shadow-50">
        <div className="mx-auto flex items-center justify-between p-20 md:px-80">
          <div className="self-center">
            <Logo
              variant="service"
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
          {desktopNavigation}
        </div>
      </header>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-[300px] h-full flex flex-col pt-16 px-24 pb-40 bg-[--sk-colors-background-content]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between py-20">
              <p className="text-h4-md">{t("menuButton")}</p>
              <Button
                onClick={() => setOpen(false)}
                aria-label={t("closeButton")}
                iconButton={true}
                showBackground={false}
                inverted={true}
              >
                <X size={24} />
              </Button>
            </div>
            <List className="flex flex-col flex-1 overflow-y-auto">
              {mobileMenuContent}
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
