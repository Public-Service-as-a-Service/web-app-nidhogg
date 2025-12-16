"use client";

import { useScreenWidth } from "@/app/hooks/useScreenWidth";
import { tailwindBreakPoint } from "@/app/constants";
import { Button } from "@sk-web-gui/react";

interface Props {
  onNext?: () => void;
}

const RecipientsStep = ({ onNext }: Props) => {
  const width = useScreenWidth();
  const isMobile = width < tailwindBreakPoint.MD;

  return (
    <div>
      <p>Mottagare</p>
      {isMobile && <Button onClick={onNext}>Gå vidare</Button>}
    </div>
  );
};

export default RecipientsStep;
