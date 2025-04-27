export interface AddNewUserDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: {
    address?: string | null;
    first_name?: string | null;
    id: any;
    last_name?: string | null;
    email?: string | null;
  };
}

export interface UserEditFormFildsData {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
}
