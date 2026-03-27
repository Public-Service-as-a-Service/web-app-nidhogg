import { ReactNode } from "react";
import useSessionStatus from "../hooks/useSessionStatus";
import Loading from "./LoadingSpinner";

interface MainWrapperProps {
  children: ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  const loggedIn = useSessionStatus();

  return loggedIn ? (
    <div className="flex flex-col pb-[80px]">
      <div className="mx-auto w-full sm:max-w-[500px] md:max-w-[700px] pt-44 px-20">
        {children}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MainWrapper;
