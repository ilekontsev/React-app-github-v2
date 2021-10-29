import { useMutation } from "react-query";
import { getClient } from "./HeadersAuth";
import { gql } from "graphql-request";

const useCreateRepo = () => {
  return useMutation("createRepo", async (createRepo: any) => {
    const client = getClient();
    return await client.request(
      gql`
        mutation {
          createRepository(input: { name: ${createRepo.name}, visibility:${createRepo.protect} }) {
            repository {
              name
              createdAt
            }
          }
        }
      `
    );
  });
};

const useAddStar = () => {
  return useMutation("addStar", async (repoId: string) => {
    const client = getClient();

    return await client.request(
      gql`
        mutation {
          addStar(input: { starrableId: "${repoId}" }) {
            starrable {
              id
            }
          }
        }
      `
    );
  });
};

const useUnStar = () => {
  return useMutation("unStar", async (repoId: string) => {
    const client = getClient();

    return await client.request(
      gql`
        mutation {
          removeStar(input: { starrableId: "${repoId}" }) {
            starrable {
              id
            }
          }
        }
      `
    );
  });
};

export { useCreateRepo, useAddStar, useUnStar };
