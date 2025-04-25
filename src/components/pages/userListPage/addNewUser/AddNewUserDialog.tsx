import {
  Button,
  CloseButton,
  Dialog,
  MenuOpenChangeDetails,
  Portal,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface AddNewUserDialogProps {
  children: ReactNode;
}

const AddNewUserDialog = ({ children }: AddNewUserDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (datails: MenuOpenChangeDetails) => {
    setIsOpen(datails.open);
  };

  return (
    <Dialog.Root size={"lg"} open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Додати нового користувача</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Скасувати</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => setIsOpen(false)}>Додати</Button>
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

export default AddNewUserDialog;
