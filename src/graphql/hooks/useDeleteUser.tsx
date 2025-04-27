import { useMutation } from "@apollo/client";
import {
  Delete_User_By_PkMutation,
  Delete_User_By_PkMutationVariables,
} from "@/graphql/types/graphql";
import { DELETE_USER } from "@/graphql/mutations/user/userMutations";

const useDeleteUser = () => {
  const [deleteUserById, { data, loading, error }] = useMutation<
    Delete_User_By_PkMutation,
    Delete_User_By_PkMutationVariables
  >(DELETE_USER, {
    update(cache, { data }) {
      const deletedUser = data?.delete_user_by_pk;

      if (deletedUser) {
        cache.modify({
          fields: {
            user(existingUsers = [], { readField }) {
              return existingUsers.filter(
                (userRef: any) => readField("id", userRef) !== deletedUser.id
              );
            },
          },
        });
      }
    },
  });

  return { deleteUserById, data, loading, error };
};

export default useDeleteUser;
