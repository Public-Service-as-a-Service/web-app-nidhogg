import { styles } from "../styles";
import { ReactNode } from "react";
import useSessionStatus from "../hooks/useSessionStatus";
import { Spinner } from "@sk-web-gui/react";

interface MainWrapperProps {
  children: ReactNode;
  title: string;
}

const MainWrapper = ({ children, title }: MainWrapperProps) => {
  const loggedIn = useSessionStatus();

  return loggedIn ? (
    <div style={styles.main}>
      <p>{title}</p>
      {children}
    </div>
  ) : (
    <div style={styles.main}>
      <Spinner className="self-center" />
    </div>
  );
};

export default MainWrapper;
