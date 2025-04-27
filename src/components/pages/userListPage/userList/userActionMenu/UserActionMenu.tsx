import { useState } from "react";
import { Button, Menu, Portal } from "@chakra-ui/react";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import EditUserDialog from "./userEditDialog/EditUserDialog";
import DeleteUseDialog from "./deleteUserConfirmDialog/DeleteUseDialog";

const createDialogController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const control = (val: boolean) => setIsOpen(val);
  return { isOpen, control };
};

const UserActionMenu = ({
  user,
}: {
  user: {
    address?: string | null;
    first_name?: string | null;
    id: any;
    last_name?: string | null;
    email?: string | null;
  };
}) => {
  const editDialog = createDialogController();
  const deleteDialog = createDialogController();

  return (
    <>
      <EditUserDialog
        open={editDialog.isOpen}
        setOpen={editDialog.control}
        user={{ ...user }}
      />

      <DeleteUseDialog
        open={deleteDialog.isOpen}
        setOpen={deleteDialog.control}
        id={user.id}
      />

      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="outline" size="sm">
            Взаємодії
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="edit" onClick={() => editDialog.control(true)}>
                <MdOutlineEdit />
                Редагувати
              </Menu.Item>
              <Menu.Item
                value="delete"
                onClick={() => deleteDialog.control(true)}
              >
                <MdDeleteForever />
                Видалити
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
};

export default UserActionMenu;
