import { styles } from "../styles";
import { ReactNode } from "react";
import useSessionStatus from "../hooks/useSessionStatus";
import { Spinner } from "@sk-web-gui/react";
import { Logo } from "@sk-web-gui/react";

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
    <div className="flex flex-col justify-center h-full">
      <Spinner className="self-center" />
    </div>
  );
};

export default MainWrapper;
