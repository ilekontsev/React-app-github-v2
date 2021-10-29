import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import GitHubActionButton from "../Buttons/GitHubActionButton";
import Button from "../Buttons/Button";
import Table from "../Table/Table";
import CreateRepoModal from "../modals/CreateRepo";
import Input from "../Search/Search";
import UserData from "../UserData/UserData";
import Loading from "../Loading/Loading";

import { dataRepos, HeaderProps } from "../../Interfaces/Interfaces";
import { RepoSort, RepoTypes } from "../../const/github_consts";

import {
  useAddStar,
  useCreateRepo,
  useUnStar,
} from "../../api/MutationRequest";
import { useSearchRepos } from "../../api/requests";

const Content = (props: HeaderProps) => {
  const [accessType, setAccessType] = useState("");
  const [mirror, setMirror] = useState(false);
  const [archived, setArchived] = useState(false);
  const [fork, setFork] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [repositories, setRepositories] = useState({} as dataRepos);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderSort, setOrderSort] = useState("name-asc");
  const [afterCursor, setAfterCursor] = useState("null");
  const [beforeCursor, setBeforeCursor] = useState("null");
  const [language, setLanguage] = useState("");
  const { data, isError, error, refetch, isLoading } = useSearchRepos(
    searchQuery,
    orderSort,
    language,
    afterCursor,
    beforeCursor,
    accessType,
    fork,
    mirror,
    archived
  );
  const mutationCreate = useCreateRepo();
  const mutationAddStar = useAddStar();
  const mutationUnStar = useUnStar();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setRepositories(data);
    }
    if (isError && error !== null) {
      const errorCode = error.response.status;
      const checkToken = localStorage.getItem("token");
      if (errorCode === 401 && checkToken === null) {
        router.push("auth/sign-in");
      }
    }
  }, [data]);

  const languageArr: string[] = ["all"];
  data?.search.repos.forEach((item) => {
    const nameLanguage = item.repo.primaryLanguage?.name;
    if (nameLanguage) {
      const checkedDuplicate = languageArr.some(
        (lang) => lang === nameLanguage
      );
      if (!checkedDuplicate) {
        languageArr.push(nameLanguage);
      }
    }
  });

  const sortLanguage = (item: string) => {
    if (item === "all") {
      setLanguage("");
    } else {
      setLanguage(item);
      setAfterCursor("null");
      setBeforeCursor("null");
    }
  };

  const selectSort = (item: string) => {
    switch (item) {
      case RepoSort.Name:
        setOrderSort("name-asc");
        break;
      case RepoSort.LastUpdate:
        setOrderSort("updated");
        break;
      case RepoSort.Stars:
        setOrderSort("stars");
        break;
    }
  };

  const selectType = (repoType: string) => {
    switch (repoType) {
      case "All":
        setAccessType("");
        setArchived(false);
        setMirror(false);
        setFork("");
        break;
      case RepoTypes.Public:
        setAccessType("public");
        setArchived(false);
        setMirror(false);
        setFork("");
        break;
      case RepoTypes.Private:
        setAccessType("private");
        setArchived(false);
        setMirror(false);
        setFork("");
        break;
      case RepoTypes.Sources:
        setAccessType("");
        setArchived(false);
        setMirror(false);
        setFork("");
        break;
      case RepoTypes.Forks:
        setFork("only");
        setAccessType("");
        setArchived(false);
        setMirror(false);
        break;
      case RepoTypes.Archived:
        setArchived(true);
        setFork("");
        setAccessType("");
        setMirror(false);
        break;
      case RepoTypes.Mirrors:
        setMirror(true);
        setArchived(false);
        setFork("");
        setAccessType("");
        break;
    }
  };

  const updateStar = async (
    viewerHasStarred: boolean,
    id: string,
    count: number
  ) => {
    repositories.search.repos.forEach((item) => {
      if (item.repo.id === id) {
        item.repo.viewerHasStarred = !viewerHasStarred;
        item.repo.stargazerCount += count;
      }
    });
    setRepositories(repositories);
    if (viewerHasStarred) {
      await mutationUnStar.mutate(id);
    } else {
      await mutationAddStar.mutate(id);
    }
  };

  const searchRepo = (searchQueryString: string) => {
    setSearchQuery(searchQueryString);
  };

  const showModalWindow = () => {
    setShowModal(!showModal);
  };

  const createRepo = async (nameRepo: string, protect: string) => {
    await mutationCreate.mutate({
      name: `"${nameRepo}"`,
      protect,
    });
    refetch().then();
  };

  const handleModal = (open: boolean) => {
    setShowModal(open);
  };

  const handleClickPageForward = () => {
    const endCursor = repositories?.search.pageInfo.endCursor;
    repositories && setAfterCursor(`"${endCursor}"`);
  };

  const handleClickPageBack = () => {
    const startCursor = data?.search.pageInfo.startCursor;
    setAfterCursor("null");
    setBeforeCursor(`"${startCursor}"`);
  };

  return (
    <div className="flex justify-center mt-4 w-3/5 m-auto">
      <div className="leftBar-profile-user">
        <UserData userData={props.userData} />
      </div>

      <div className="flex-grow">
        <div className="group-search-and-buttons flex item-center w-full">
          <Input
            action={searchRepo}
            class="mr-2"
            placeholder={"find a repos..."}
          />
          <GitHubActionButton
            title="Type"
            options={Object.values(RepoTypes)}
            action={selectType}
          />
          <GitHubActionButton
            title="Language"
            options={languageArr}
            action={sortLanguage}
          />
          <GitHubActionButton
            title="Sort"
            options={Object.values(RepoSort)}
            action={selectSort}
          />
          <Button
            title={"New"}
            class={" bg-green-600 hover:bg-green-400"}
            action={showModalWindow}
          />
          {showModal && (
            <CreateRepoModal handleModal={handleModal} create={createRepo} />
          )}
        </div>
        <div className="table-with-repositories w-full bg-white">
          {isLoading ? (
            <Loading />
          ) : (
            repositories.search?.repos && (
              <Table data={repositories.search.repos} updateStar={updateStar} />
            )
          )}
        </div>
        <div
          className={"button-pagination mt-2 flex justify-center items-center"}
        >
          {data?.search.pageInfo.hasPreviousPage && (
            <Button
              title={"<<<"}
              action={handleClickPageBack}
              class={"bg-customGray"}
            />
          )}
          {data?.search.pageInfo.hasNextPage && (
            <Button
              title={">>>"}
              action={handleClickPageForward}
              class={"bg-customGray"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
