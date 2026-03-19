import { Button } from "@sk-web-gui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ShowAllToggleButtonProps {
  totalCount: number;
  visibleCount: number;
  collapsedCount: number;
  onToggle: (amount: number) => void;
  showAllText: string;
  goBackText: string;
}

const ShowAllToggleButton = ({
  totalCount,
  visibleCount,
  collapsedCount,
  onToggle,
  showAllText,
  goBackText,
}: ShowAllToggleButtonProps) => {
  if (totalCount <= collapsedCount) return null;

  return visibleCount === collapsedCount ? (
    <div className="flex flex-row place-content-end">
      <Button variant="secondary" onClick={() => onToggle(totalCount)}>
        {showAllText}
        <ArrowRight />
      </Button>
    </div>
  ) : (
    <div className="flex flex-row place-content-start">
      <Button variant="secondary" onClick={() => onToggle(collapsedCount)}>
        {goBackText}
        <ArrowLeft />
      </Button>
    </div>
  );
};

export default ShowAllToggleButton;
