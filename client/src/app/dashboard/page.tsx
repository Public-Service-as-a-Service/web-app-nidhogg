"use client";
import { Box, Typography } from "@mui/material";
import MainWrapper from "../components/MainWrapper";
import { useTranslations } from "next-intl";

const Dashboard = () => {
  const t = useTranslations("Dashboard");

  return (
    <MainWrapper title={t("title")}>
      <Box>
        <Typography variant="h4" color="text.primary">
          {t("welcomeMessage")}
        </Typography>
      </Box>
    </MainWrapper>
  );
};

export default Dashboard;
