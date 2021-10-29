import { useQuery } from "react-query";
import { gql } from "graphql-request";
import { UseQueryResult } from "react-query/types/react/types";

import { getClient } from "./HeadersAuth";

import {
  dataRepos,
  IDescriptionRepository,
  UserDataDesc,
} from "../Interfaces/Interfaces";

import {
  commit,
  getAllBranch,
  pageInfo,
  repoNode,
  repositoryInfo,
} from "./constRequests";

export interface ErrorDesc {
  response: {
    status: number;
  };
}

const useGetUserData = (): UseQueryResult<UserDataDesc> => {
  return useQuery("posts", async () => {
    const client = getClient();
    return await client.request(
      gql`
        query {
          viewer {
            login
            avatarUrl
          }
        }
      `
    );
  });
};

const useSearchRepos = (
  text: string = "",
  sort: string = "",
  language: string = "",
  after: string = "",
  before: string = "",
  accessType: string = "",
  fork: string = "",
  mirror: boolean = false,
  archived: boolean = false
): UseQueryResult<dataRepos, ErrorDesc> => {
  return useQuery(
    [
      "getRepositories",
      text,
      sort,
      language,
      after,
      before,
      accessType,
      fork,
      mirror,
      archived,
    ],
    async () => {
      const client = getClient();
      const userName = localStorage.getItem("userName");
      let firstOrLast = "first";
      if (before) {
        firstOrLast = "last";
      }
      return await client.request(
        gql`
          {
            search(
              type: REPOSITORY
              query: """
              language:"${language}"
              ${text} sort:${sort} user:${userName} is:${accessType} fork:"" mirror:${mirror} archived:${archived} """
              after: ${after}
              before: ${before}
              ${firstOrLast}: 5
            ) {
               ${pageInfo} 
              repos: edges {
               ${repoNode}
              }
            }
          }
      `
      );
    }
  );
};

const useDescriptionRepo = (
  id: string,
  branch: string
): UseQueryResult<IDescriptionRepository> => {
  return useQuery(["descriptionRepository", id, branch], async () => {
    const client = getClient();
    const userName = localStorage.getItem("userName");
    return await client.request(
      gql`
        {
          viewer {
            avatarUrl
          }
          repository(name: "${id}", owner: "${userName}") {
              ${repositoryInfo}
            ... on Repository {
              ${getAllBranch}
              name
              id
              url
               ref(qualifiedName: "${branch}") {
                 ${commit}
                }
              }
            }
          }
        }
      `
    );
  });
};

export { useSearchRepos, useGetUserData, useDescriptionRepo };
