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
    <div className="flex flex-col pb-[80px]">
      <div className="self-center">
        <Logo variant="service" title={t("title")} subtitle={t("subtitle")} />
      </div>
      <div className="mx-auto w-full sm:max-w-[500px] md:max-w-[700px] pt-44 px-20">
        {children}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MainWrapper;
