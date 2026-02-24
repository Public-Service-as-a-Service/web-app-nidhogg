import { Button } from "@sk-web-gui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MessageToggleButtonProps {
  messagesLength: number;
  amount: number;
  onToggle: (amount: number) => void;
  showAllText: string;
  goBackText: string;
}

const MessageToggleButton = ({
  messagesLength,
  amount,
  onToggle,
  showAllText,
  goBackText,
}: MessageToggleButtonProps) => {
  if (messagesLength <= 3) return null;

  return amount === 3 ? (
    <div className="flex flex-row place-content-end">
      <Button variant="secondary" onClick={() => onToggle(messagesLength)}>
        {showAllText}
        <ArrowRight />
      </Button>
    </div>
  ) : (
    <div className="flex flex-row place-content-start">
      <Button variant="secondary" onClick={() => onToggle(3)}>
        {goBackText}
        <ArrowLeft />
      </Button>
    </div>
  );
};

export default MessageToggleButton;
