import { gql } from "@apollo/client";

// не найшов в документійії як зробити пагінацію через відсутнійсть total pages чи щось таке(бек наче такої можливості немає)
export const GET_USERS = gql`
  query getAllUsers($limit: Int, $offset: Int, $orderBy: [user_order_by!]) {
    user(limit: $limit, offset: $offset, order_by: $orderBy) {
      address
      first_name
      id
      last_name
      email
    }
  }
`;
