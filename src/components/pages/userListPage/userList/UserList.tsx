import { Spinner, Table } from "@chakra-ui/react";

import UserActionMenu from "./userActionMenu/UserActionMenu";
import { ifErrToaster } from "@/utils/tosts";
import useGetUsers from "@/graphql/hooks/useGetUsers";

const UserList = () => {
  const { loading, error, data } = useGetUsers();

  if (loading) return <Spinner margin={"0 50px"} />;
  if (error)
    ifErrToaster(`помилка отримання юзерів ${error?.name} ${error?.message}`);

  return (
    <Table.ScrollArea
      borderWidth="1px"
      rounded="lg"
      height="600px"
      margin={"0 50px"}
    >
      <Table.Root
        size="sm"
        stickyHeader
        showColumnBorder
        variant={"line"}
        interactive
      >
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader></Table.ColumnHeader>
            <Table.ColumnHeader>Ім'я</Table.ColumnHeader>
            <Table.ColumnHeader>Фамілія</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Адрес</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Email</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.user.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <UserActionMenu user={item} />
              </Table.Cell>
              <Table.Cell>{item.first_name}</Table.Cell>
              <Table.Cell>{item.last_name}</Table.Cell>
              <Table.Cell textAlign="end">{item.address}</Table.Cell>
              <Table.Cell textAlign="end">{item.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default UserList;
