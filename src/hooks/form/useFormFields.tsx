import {
  useForm,
  FieldValues,
  DefaultValues,
  SubmitHandler,
} from "react-hook-form";

interface UseFormFieldsProps<T extends FieldValues> {
  defaultValues?: DefaultValues<T>;
  onSubmitFunc?: (data: T) => void;
}

const useFormFields = <T extends FieldValues>({
  defaultValues,
  onSubmitFunc,
}: UseFormFieldsProps<T>) => {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<T>({
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<T> = (data) => {
    if (onSubmitFunc) {
      onSubmitFunc(data);
    }
  };

  const submitHandler = async () => {
    await handleSubmit(onSubmit)();
  };

  return {
    register,
    handleSubmit,
    submitHandler,
    reset,
    errors,
    isValid,
    trigger,
  };
};

export default useFormFields;
