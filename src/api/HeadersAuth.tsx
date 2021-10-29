import { GraphQLClient } from "graphql-request";

const endpoint = "https://api.github.com/graphql";

const getClient = () => {
  const token = localStorage.getItem("token") || "";

  return new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getClient };
