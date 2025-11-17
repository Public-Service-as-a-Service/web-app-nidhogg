import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { styles } from "../styles";
import { theme } from "@/theme";
import { ReactNode } from "react";
import useSessionStatus from "../hooks/useSessionStatus";

interface MainWrapperProps {
  children: ReactNode;
  title: string;
}

const MainWrapper = ({ children, title }: MainWrapperProps) => {
  const loggedIn = useSessionStatus();

  return loggedIn ? (
    <Box component='main' sx={styles.main}>
      <Typography variant='h3' color='text.primary'>
        {title}
      </Typography>
      <Divider
        sx={{
          width: "100%",
          background: theme.palette.primary.dark,
          mt: 2,
          mb: 2,
        }}
      />
      {children}
    </Box>
  ) : (
    <Box component='main' sx={styles.main} alignItems={"center"}>
      <CircularProgress />
    </Box>
  );
};

export default MainWrapper;
