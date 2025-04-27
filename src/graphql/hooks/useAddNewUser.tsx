import { useMutation } from "@apollo/client";
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "../types/graphql";
import { CREATE_USER } from "../mutations/user/userMutations";

const useAddNewUser = () => {
  const [createUser, { data, loading, error }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER, {
    update(cache, { data }) {
      const newUser = data?.insert_user_one;

      if (newUser) {
        cache.modify({
          fields: {
            user(existingUsers = []) {
              return [{ __typename: "User", ...newUser }, ...existingUsers];
            },
          },
        });
      }
    },
  });

  return { createUser, data, loading, error };
};

export default useAddNewUser;
