import { USER_FIELDS } from "@/graphql/fragments/user";
import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation Delete_user_by_pk($deleteUserByPkId: uuid!) {
    delete_user_by_pk(id: $deleteUserByPkId) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Update_user_by_pk(
    $pkColumns: user_pk_columns_input!
    $set: user_set_input
  ) {
    update_user_by_pk(pk_columns: $pkColumns, _set: $set) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const CREATE_USER = gql`
  mutation CreateUser($object: user_insert_input!) {
    insert_user_one(object: $object) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
