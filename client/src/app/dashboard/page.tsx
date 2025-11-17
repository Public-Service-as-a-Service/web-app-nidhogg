"use client";
import { Box, Typography } from "@mui/material";
import MainWrapper from "../components/MainWrapper";

const Dashboard = () => {
  return (
    <MainWrapper title='Dashboard'>
      <Box>
        <Typography variant='h4' color='text.primary'>
          Render stuff here 🤙
        </Typography>
      </Box>
    </MainWrapper>
  );
};

export default Dashboard;
