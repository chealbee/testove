import { useQuery } from "@apollo/client";
import {
  GetAllUsersQuery,
  GetAllUsersQueryVariables,
  Order_By,
} from "@/graphql/types/graphql";
import { GET_USERS } from "@/graphql/queries/user/usersQuerys";

const useGetUsers = () => {
  const { loading, error, data } = useQuery<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >(GET_USERS, {
    variables: { limit: 100, orderBy: { created_at: Order_By.Desc } },
  });

  return { data, loading, error };
};

export default useGetUsers;
