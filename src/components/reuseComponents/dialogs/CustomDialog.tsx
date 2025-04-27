import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface CustomDialogProps {
  DialogTrigger?: ReactNode;
  children?: ReactNode;
  dialogTitle?: ReactNode;
  cancelButton?: ReactNode;
  confirmButton?: ReactNode;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  loading?: boolean;
}

const CustomDialog = ({
  DialogTrigger,
  children,
  cancelButton,
  confirmButton,
  dialogTitle,
  open,
  setOpen,
  loading,
}: CustomDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined && setOpen !== undefined;

  const isOpen = isControlled ? open : internalOpen;
  const setDialogOpen = isControlled ? setOpen! : setInternalOpen;

  const handleOpenChange = (details: { open: boolean }) => {
    setDialogOpen(details.open);
  };

  const renderCancelButton = cancelButton ?? (
    <Button variant="outline" disabled={loading}>
      Скасувати
    </Button>
  );

  const renderConfirmButton = confirmButton ?? (
    <Button
      onClick={() => handleOpenChange({ open: false })}
      colorPalette={"teal"}
      variant="outline"
    >
      Підтвердити
    </Button>
  );

  return (
    <Dialog.Root size={"lg"} open={isOpen} onOpenChange={handleOpenChange}>
      {DialogTrigger && (
        <Dialog.Trigger asChild>{DialogTrigger}</Dialog.Trigger>
      )}

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              {dialogTitle ? <Dialog.Title>{dialogTitle}</Dialog.Title> : null}
            </Dialog.Header>
            <Dialog.Body>{children ? children : "content..."}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                {cancelButton ? cancelButton : renderCancelButton}
              </Dialog.ActionTrigger>
              {confirmButton ? confirmButton : renderConfirmButton}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CustomDialog;
