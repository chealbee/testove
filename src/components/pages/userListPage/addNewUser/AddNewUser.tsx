import { Button, Flex, Heading } from "@chakra-ui/react";
import AddNewUserDialog from "./AddNewUserDialog";

const AddNewUser = () => {
  return (
    <Flex gap="4" margin={"20px 50px"} justifyContent={"space-between"}>
      <Heading size="xl">Список користувачів:</Heading>

      <AddNewUserDialog>
        <Button colorPalette={"teal"} variant="outline">
          Додати нового користувача
        </Button>
      </AddNewUserDialog>
    </Flex>
  );
};

export default AddNewUser;
