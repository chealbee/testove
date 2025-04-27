import { USER_FIELDS } from "@/graphql/fragments/user";
import { gql } from "@apollo/client";

// не найшов в документійії як зробити пагінацію через відсутнійсть total pages чи щось таке(бек наче такої можливості немає)
export const GET_USERS = gql`
  query getAllUsers($limit: Int, $offset: Int, $orderBy: [user_order_by!]) {
    user(limit: $limit, offset: $offset, order_by: $orderBy) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
