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
    <div style={styles.main}>
      <p color="text.primary">{title}</p>
      <div
        style={{
          width: "100%",
          background: theme.palette.primary.dark,
        }}
      />
      {children}
    </div>
  ) : (
    <div style={styles.main}>
      <p>Laddar...</p>
    </div>
  );
};

export default MainWrapper;
