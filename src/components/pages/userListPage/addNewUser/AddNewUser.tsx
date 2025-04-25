import { Button, Flex, Heading } from "@chakra-ui/react";

const AddNewUser = () => {
  return (
    <Flex gap="4" margin={"20px 50px"} justifyContent={"space-between"}>
      <Heading size="xl">Список користувачів:</Heading>
      <Button colorPalette={"teal"} variant="outline">
        Додати нового користувача
      </Button>
    </Flex>
  );
};

export default AddNewUser;
