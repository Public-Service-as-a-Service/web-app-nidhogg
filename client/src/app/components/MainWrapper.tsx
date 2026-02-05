import { styles } from "../styles";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import useSessionStatus from "../hooks/useSessionStatus";
import { Logo } from "@sk-web-gui/react";
import Loading from "./LoadingSpinner";

interface MainWrapperProps {
  children: ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  const loggedIn = useSessionStatus();
  const t = useTranslations("Wrapper");

  return loggedIn ? (
    <div style={styles.main}>
      <Logo variant="service" title={t("title")} subtitle={t("subtitle")} />
      {children}
    </div>
  ) : (
    <Loading />
  );
};

export default MainWrapper;
