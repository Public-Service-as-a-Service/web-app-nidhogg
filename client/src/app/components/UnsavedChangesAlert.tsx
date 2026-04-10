import { Alert } from '@sk-web-gui/alert';
import { Button } from '@sk-web-gui/react';
import { X, TriangleAlert } from 'lucide-react';
import { useLeavePageGuard } from "./LeavePageGuard";
interface UnsavedChangesAlertProps {
  onConfirm: () => void;  
  onCancel: () => void;
}

export const LeavePageAlert = ({ onConfirm, onCancel }: UnsavedChangesAlertProps) => {
  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 pt-[10%]" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <Alert type="warning" size="md" className="max-w-[335px] max-h-[168]">
        <TriangleAlert />
        <Alert.Content>
          <Alert.Content.Title>Vill du lämna sidan?</Alert.Content.Title>
          <Alert.Content.Description>
            Dina ändringar kommer inte att sparas.
          </Alert.Content.Description>
          <div className="flex gap-8 mt-8">
            <Button size="sm" variant="secondary" onClick={onCancel}>
              Avbryt
            </Button>
            <Button size="sm" onClick={onConfirm}>
              Lämna
            </Button>
          </div>
        </Alert.Content>
        <Alert.Button leftIcon={<X />} iconButton size="sm" onClick={onCancel} />
      </Alert>
    </div>
  );
};

export const LeavePageAlertPortal = () => {
  const { showAlert, setShowAlert, pendingAction, setPendingAction, setHasChanges } = useLeavePageGuard();

  if (!showAlert) return null;

  const handleConfirm = () => {
    setHasChanges(false);
    setShowAlert(false);
    setPendingAction(null);
    pendingAction?.();
  };

  return (
    <LeavePageAlert
      onConfirm={handleConfirm}
      onCancel={() => setShowAlert(false)}
    />
  );
};