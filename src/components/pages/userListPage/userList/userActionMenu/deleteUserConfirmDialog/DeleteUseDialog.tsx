import CustomDialog from "@/components/reuseComponents/dialogs/CustomDialog";
import { Button } from "@chakra-ui/react";
import { createSuccessToaster, ifErrToaster } from "@/utils/toasts";
import { useEffect } from "react";
import useDeleteUser from "@/graphql/hooks/useDeleteUser";

interface DeleteUseDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
}

const DeleteUseDialog = ({ id, open, setOpen }: DeleteUseDialogProps) => {
  const { deleteUserById, error, loading } = useDeleteUser();

  useEffect(() => {
    if (error) ifErrToaster(`Помилка при видаленні юзера: ${error.message}`);
  }, [error]);

  const deleteUser = async () => {
    try {
      await deleteUserById({ variables: { deleteUserByPkId: id } });
      createSuccessToaster("Юзер успішно видалений");
      setOpen(false);
    } catch (err) {
      console.error("Помилка при видаленні юзера:", err);
    }
  };

  const renderConfirmButton = (
    <Button
      disabled={loading}
      loading={loading}
      colorPalette={"red"}
      variant="outline"
      onClick={deleteUser}
    >
      видалити
    </Button>
  );

  return (
    <CustomDialog
      open={open}
      setOpen={(e) => {
        if (!loading) setOpen(e);
      }}
      confirmButton={renderConfirmButton}
    >
      {error
        ? "Помилка при видаленні юзера: " + error?.message
        : `Ви точно хочете видалити користувача з id: ${id} ?`}
    </CustomDialog>
  );
};

export default DeleteUseDialog;
