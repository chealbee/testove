import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Field, Input } from "@chakra-ui/react";

interface FieldConfig<T extends FieldValues> {
  label: string;
  placeholder: string;
  registerName: Path<T>;
  registerValidationConf: RegisterOptions<T>;
  error?: string;
}

interface ControledFormFildsListProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  loading?: boolean;
  fields: FieldConfig<T>[];
}

const ControledFormFildsList = <T extends FieldValues>({
  register,
  loading = false,
  fields,
}: ControledFormFildsListProps<T>) => {
  return (
    <form>
      {fields.map((field) => (
        <Field.Root
          key={field.registerName}
          invalid={!!field.error}
          marginBottom="20px"
        >
          <Field.Label>{field.label}</Field.Label>
          <Input
            disabled={loading}
            {...register(field.registerName, field.registerValidationConf)}
            placeholder={field.placeholder}
          />
          {field.error && <Field.ErrorText>{field.error}</Field.ErrorText>}
        </Field.Root>
      ))}
    </form>
  );
};

export default ControledFormFildsList;
