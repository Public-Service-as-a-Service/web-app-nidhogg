"use client";
import AppBar from "@mui/material/AppBar";
import { usePathname, useRouter } from "next/navigation";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLogout } from "../services/useLogout";
import { PATHS } from "../constants";
import { useState } from "react";
import Link from "next/link";
import { isProtectedPage } from "@/middleware";
import { useTranslations } from "next-intl";
import { Button } from "@sk-web-gui/react";

const AppBarHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const t = useTranslations("AppBar");

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        console.error("Utloggningen misslyckades.");
      },
    });
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    isProtectedPage(pathname) && (
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <Button
            type="button"
            color="primary"
            variant="secondary"
            size="lg"
            onClick={handleLogout}
            data-cy="logout-button"
          >
            {isPending ? t("loggingOut") : t("logOut")}
          </Button>
        </Toolbar>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <List sx={{ m: 4 }}>
            {PATHS.filter((p) => p.isVisible).map((path, i) => {
              return (
                <Link
                  key={i}
                  href={path.url}
                  style={{ color: "inherit", textDecoration: "none" }}
                  onClick={toggleDrawer(false)}
                >
                  <ListItem>
                    <ListItemText primary={path.title} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Drawer>
      </AppBar>
    )
  );
};

export default AppBarHeader;
