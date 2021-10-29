import { useQuery } from "react-query";
import { gql, GraphQLClient } from "graphql-request";
import { UseQueryResult } from "react-query/types/react/types";
import { UserDataDesc } from "../Interfaces/Interfaces";

const endpoint = "https://api.github.com/graphql";

const getClient = (token: string) => {
  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const checkToken = (token: string): UseQueryResult<UserDataDesc> => {
  return useQuery(["checkToken", token], async () => {
    if (!token) {
      return;
    }
    try {
      const client = getClient(token);
      return await client.request(
        gql`
          query {
            viewer {
              login
            }
          }
        `
      );
    } catch (e) {
      throw new Error("erooras");
    }
  });
};

export { checkToken };
