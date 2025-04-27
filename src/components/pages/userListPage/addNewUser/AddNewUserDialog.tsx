import CustomDialog from "@/components/reuseComponents/dialogs/CustomDialog";
import { ReactNode, useEffect, useState } from "react";
import useAddNewUser from "@/graphql/hooks/useAddNewUser";
import { createSuccessToaster, ifErrToaster } from "@/utils/toasts";
import { Button } from "@chakra-ui/react";
import ControledFormFildsList from "@/components/reuseComponents/forms/ControledFormFildsList";
import useFormFields from "../../../../hooks/form/useFormFields";
import { USER_DATA } from "@/types/user";

const AddNewUserDialog = ({ children }: { children: ReactNode }) => {
  const { createUser, error, loading } = useAddNewUser();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const controlEditDialog = (open: boolean) => {
    setIsEditDialogOpen(open);
  };

  useEffect(() => {
    if (error) ifErrToaster(error.message);
  }, [error]);

  const submitEditUser = async (data: USER_DATA) => {
    try {
      await createUser({
        variables: {
          object: {
            address: data.address,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
          },
        },
      });
      createSuccessToaster(`Юзера успішно створено`);

      reset();
      setIsEditDialogOpen(false);
    } catch (error) {
      ifErrToaster("Помилка при оновленні юзера");
    }
  };

  const { errors, isValid, register, reset, submitHandler, trigger } =
    useFormFields<USER_DATA>({
      onSubmitFunc: submitEditUser,
    });

  const handleValidationAndSubmit = async () => {
    await trigger();
    if (!isValid) ifErrToaster("Невірно заповнена форма");
    if (isValid) submitHandler();
  };

  const renderConfirmButton = (
    <Button
      colorPalette={"teal"}
      variant={"outline"}
      disabled={loading}
      loading={loading}
      onClick={handleValidationAndSubmit}
    >
      Додати новго юзера
    </Button>
  );

  return (
    <>
      <CustomDialog
        dialogTitle="Додати нового юзера"
        loading={loading}
        DialogTrigger={children}
        setOpen={(open) => {
          if (!loading) controlEditDialog(open);
          if (!loading) reset();
        }}
        open={isEditDialogOpen}
        confirmButton={renderConfirmButton}
      >
        <ControledFormFildsList<USER_DATA>
          register={register}
          loading={loading}
          fields={[
            {
              label: "Ім'я",
              placeholder: "Введіть ім'я",
              registerName: "first_name",
              registerValidationConf: { required: "Обов'язкове поле" },
              error: errors.first_name?.message,
            },
            {
              label: "Фамілія",
              placeholder: "Введіть фамілію",
              registerName: "last_name",
              registerValidationConf: { required: "Обов'язкове поле" },
              error: errors.last_name?.message,
            },
            {
              label: "Email",
              placeholder: "Введіть Email",
              registerName: "email",
              registerValidationConf: { required: "Обов'язкове поле" },
              error: errors.email?.message,
            },
            {
              label: "Адрес",
              placeholder: "Введіть адрес",
              registerName: "address",
              registerValidationConf: { required: "Обов'язкове поле" },
              error: errors.address?.message,
            },
          ]}
        />
      </CustomDialog>
    </>
  );
};

export default AddNewUserDialog;
