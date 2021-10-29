export interface FormData {
  token: string;
}

export interface CreateRepoProps {
  handleModal: (open: boolean) => void;
  create: (name: string, protect: string) => void;
}

export interface HeaderProps {
  userData?: {
    viewer: {
      login?: string;
      avatarUrl: string;
    };
  };
}

export interface UserDataDesc {
  viewer: {
    login: string;
    avatarUrl: string;
  };
}

export interface dataRepos {
  search: {
    pageInfo: {
      startCursor: string;
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    repos: [{ repo: Repo }];
  };
}

export interface Repo {
  url: string;
  name: string;
  updatedAt: string;
  id: string;
  viewerHasStarred: boolean;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
  };
}

export interface DataTable {
  data: [
    {
      repo: Repo;
    }
  ];
  updateStar: (viewerHasStarred: boolean, id: string, count: number) => void;
}

export interface IDescriptionRepository {
  viewer: {
    avatarUrl: string;
  };
  repository: {
    refs: {
      edges: [
        {
          node: {
            branchName: string;
          };
        }
      ];
    };
    createdAt: string;
    languages: {
      nodes: [
        {
          name: string;
        }
      ];
    };
    viewerHasStarred: boolean;
    stargazerCount: number;
    name: string;
    id: string;
    url: string;
    ref: {
      target: {
        history: {
          edges: [
            {
              node: {
                author: {
                  name: string;
                  user: {
                    login: string;
                  };
                };
                committedDate: string;
                message: string;
              };
            }
          ];
        };
      };
    };
  };
}

export interface InputProps {
  action: (value: string) => void;
  placeholder: string;
  class?: string;
}

export interface ActionButtonProps {
  options?: string[];
  action: (item: string) => void;
  title: string;
}

export interface ButtonProps {
  title: string;
  icon?: string;
  class: string;
  action?: () => void;
}
