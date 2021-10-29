const pageInfo = `pageInfo{
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                   }`;
const repoNode = `repo: node {
                  ... on Repository {
                    url
                    name
                    updatedAt
                    id
                    viewerHasStarred
                      stargazerCount
                    primaryLanguage {
                      name
                    }
                  }
                } `;
const repositoryInfo = `languages(first:3){
                          nodes{
                            name
                          }
                        }
                        createdAt
                        viewerHasStarred
                        stargazerCount`;
const getAllBranch = `refs(refPrefix: "refs/heads/", first: 10) {
                        edges {
                          node {
                            branchName:name
                          }
                        }
                      }`;
const commit = `target {
                  ... on Commit {
                    history(first: 10) {
                      edges {
                        node {
                          ... on Commit {
                            committedDate
                            author {
                              name
                              user {
                            login
                          }
                            }
                            message
                          }
                        }
                      }
                    }
                  }`;
export { pageInfo, repoNode, repositoryInfo, getAllBranch, commit };
