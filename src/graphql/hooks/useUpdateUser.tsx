import { UPDATE_USER } from "@/graphql/mutations/user/userMutations";

import { useMutation } from "@apollo/client";
import {
  Update_User_By_PkMutation,
  Update_User_By_PkMutationVariables,
} from "../types/graphql";

const useUpdateUser = () => {
  const [updateUser, { loading, error }] = useMutation<
    Update_User_By_PkMutation,
    Update_User_By_PkMutationVariables
  >(UPDATE_USER, {
    errorPolicy: "all",
    optimisticResponse: (variables) => ({
      update_user_by_pk: {
        __typename: "user",
        id: variables.pkColumns.id,
        ...variables.set,
      },
    }),
    update(cache, { data }) {
      const updatedUser = data?.update_user_by_pk;

      if (updatedUser) {
        cache.modify({
          fields: {
            user(existingUsers = [], { readField }) {
              return existingUsers.map((userRef: any) => {
                if (readField("id", userRef) === updatedUser.id) {
                  return {
                    ...userRef,
                    address: updatedUser.address,
                    email: updatedUser.email,
                    first_name: updatedUser.first_name,
                    last_name: updatedUser.last_name,
                  };
                }
                return userRef;
              });
            },
          },
        });
      }
    },
  });

  return { updateUser, loading, error };
};

export default useUpdateUser;
