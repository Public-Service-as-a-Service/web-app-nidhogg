"use client";

import { Box, Typography } from "@mui/material";
import MainWrapper from "../components/MainWrapper";
import { useTranslations } from "next-intl";
import TreeView from "../components/TreeView/TreeView";

const Dashboard = () => {
  const t = useTranslations("Dashboard");

  return (
    <MainWrapper title={t("title")}>
      <Box>
        <Typography variant="h4" color="text.primary">
          {t("welcomeMessage")}
        </Typography>
        <TreeView />
      </Box>
    </MainWrapper>
  );
};

export default Dashboard;
