"use client";

import { useScreenWidth } from "@/app/hooks/useScreenWidth";
import { tailwindBreakPoint } from "@/app/constants";
import { Button } from "@sk-web-gui/react";

interface Props {
  onPrev?: () => void;
}

const MessageStep = ({ onPrev }: Props) => {
  const width = useScreenWidth();
  const isMobile = width < tailwindBreakPoint.MD;

  return (
    <div className="py-44">
      <p>Meddelande</p>
      {isMobile && <Button onClick={onPrev}>Gå tillbaka</Button>}
    </div>
  );
};

export default MessageStep;
