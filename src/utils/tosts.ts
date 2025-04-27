import { toaster } from "@/components/ui/toaster";

export const ifErrToaster = (errText: string | undefined | null) => {
  if (errText)
    toaster.create({
      description: errText,
      type: "error",
    });
};

export const createSuccessToaster = (text: string) => {
  toaster.create({
    description: text,
    type: "success",
  });
};

export const createInfoToaster = (text: string) => {
  toaster.create({
    description: text,
    type: "info",
  });
};
