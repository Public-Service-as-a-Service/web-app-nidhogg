import { styles } from "../styles";
import { ReactNode } from "react";
import useSessionStatus from "../hooks/useSessionStatus";
import { Logo } from "@sk-web-gui/react";
import Loading from "./LoadingSpinner";

interface MainWrapperProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const MainWrapper = ({ children, title, subtitle }: MainWrapperProps) => {
  const loggedIn = useSessionStatus();

  return loggedIn ? (
    <div style={styles.main}>
      <Logo variant="service" title={title} subtitle={subtitle} />
      {children}
    </div>
  ) : (
    <Loading />
  );
};

export default MainWrapper;
