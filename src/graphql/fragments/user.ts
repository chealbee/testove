import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on user {
    id
    first_name
    last_name
    email
    address
  }
`;
