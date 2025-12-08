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
      <h1>{title}</h1>
      {children}
    </div>
  ) : (
    <div className="flex flex-col justify-center h-full">
      <Spinner className="self-center" />
    </div>
  );
};

export default MainWrapper;
