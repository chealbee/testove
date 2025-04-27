import CustomDialog from "@/components/customComponents/dialogs/CustomDialog";
import { Button } from "@chakra-ui/react";
import { createSuccessToaster, ifErrToaster } from "@/utils/tosts";
import useUpdateUser from "@/graphql/hooks/useUpdateUser";
import { useEffect } from "react";
import ControledFormFildsList from "@/components/customComponents/forms/ControledFormFildsList";
import useFormFields from "../../../../../../hooks/form/useUserFormFilds";
import { AddNewUserDialogProps, UserEditFormFildsData } from "./intefaces";

const EditUserDialog = ({ open, user, setOpen }: AddNewUserDialogProps) => {
  const { updateUser, loading, error } = useUpdateUser();

  useEffect(() => {
    if (error) ifErrToaster(error.message);
  }, [error]);

  const submitEditUser = async (data: UserEditFormFildsData) => {
    const isChanged =
      data.address !== user.address ||
      data.email !== user.email ||
      data.first_name !== user.first_name ||
      data.last_name !== user.last_name;

    if (!isChanged) ifErrToaster("Ви не ввели нові данні");
    if (isChanged)
      try {
        await updateUser({
          variables: {
            set: {
              address: data.address,
              email: data.email,
              first_name: data.first_name,
              last_name: data.last_name,
            },
            pkColumns: { id: user.id },
          },
        });

        createSuccessToaster(`Юзера оновлено успішно`);
        setOpen(false);
      } catch (error) {
        ifErrToaster(`Помилка при оновленні юзера`);
      }
  };

  const { errors, register, reset, submitHandler, trigger } =
    useFormFields<UserEditFormFildsData>({
      defaultValues: {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        address: user.address || "",
      },
      onSubmitFunc: submitEditUser,
    });

  const handleValidationAndSubmit = async () => {
    const isFormValid = await trigger();
    if (!isFormValid) ifErrToaster("Невірно заповнена форма");
    if (isFormValid) submitHandler();
  };

  return (
    <CustomDialog
      open={open}
      setOpen={(open) => {
        if (!loading) setOpen(open);
      }}
      dialogTitle="Редагувати юзера"
      confirmButton={
        <Button
          loading={loading}
          disabled={loading}
          colorPalette={"teal"}
          variant={"outline"}
          onClick={handleValidationAndSubmit}
        >
          Зберегти
        </Button>
      }
      cancelButton={
        <Button variant={"outline"} onClick={() => reset()} disabled={loading}>
          Скасувати
        </Button>
      }
    >
      <ControledFormFildsList<UserEditFormFildsData>
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
  );
};

export default EditUserDialog;
