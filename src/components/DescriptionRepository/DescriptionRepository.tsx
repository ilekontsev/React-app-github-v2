import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../Header/Header";
import Button from "../Buttons/Button";
import GitHubActionButton from "../Buttons/GitHubActionButton";

import { useDescriptionRepo } from "../../api/requests";
import { useAddStar, useUnStar } from "../../api/MutationRequest";

import { IDescriptionRepository } from "../../Interfaces/Interfaces";

const DescriptionRepository = () => {
  const router = useRouter();
  const { id } = router.query;

  const [descriptionRepo, setDescriptionRepo] = useState(
    {} as IDescriptionRepository
  );
  const [titleBranch, setTitleBranch] = useState("Branch");
  const [branchSelect, setBranchSelect] = useState("main");
  const { data } = useDescriptionRepo(id as string, branchSelect);

  const mutationAddStar = useAddStar();
  const mutationUnStar = useUnStar();

  const descRepoArray =
    descriptionRepo?.repository?.ref?.target?.history?.edges;

  const dateCreated = descriptionRepo?.repository?.createdAt?.split("T")[0];
  const title = descriptionRepo?.repository?.viewerHasStarred
    ? "Unstar"
    : "Star";

  const languageArr = data?.repository?.languages?.nodes;

  const branchArr: string[] = [];
  const edges = data?.repository.refs.edges;
  edges?.forEach((branch) => {
    branchArr.push(branch.node.branchName);
  });

  useEffect(() => {
    if (data) {
      setDescriptionRepo(data);
    }
  }, [data]);

  const handleClickStar = () => {
    const checkStar = descriptionRepo?.repository.viewerHasStarred;
    const repoId = descriptionRepo.repository.id;

    if (checkStar && data) {
      data.repository.viewerHasStarred = !checkStar;
      data.repository.stargazerCount -= 1;
      setDescriptionRepo(data);
      mutationUnStar.mutate(repoId);
    } else if (!checkStar && data) {
      data.repository.viewerHasStarred = !checkStar;
      data.repository.stargazerCount += 1;
      setDescriptionRepo(data);
      mutationAddStar.mutate(repoId);
    }
  };

  const selectType = (type: string) => {
    setTitleBranch(type);
    setBranchSelect(type);
  };

  return (
    <div>
      <Header userData={data} />
      <div className="content mt-4 w-3/5 m-auto text-white">
        <div className="repo-info-with-action-buttons flex justify-between items-start p-4 w-full border border-black-100 h-48">
          <div className="repo-info flex flex-col justify-between h-full">
            <div className="repo-name">
              <a
                href={data?.repository.url}
                className="text-4xl leading-6 underline"
              >
                {data?.repository.name}
              </a>
            </div>
            <div>
              <p className="date-of-creation text-xl leading-6">
                {dateCreated}
              </p>
            </div>
            <div className="languages flex">
              {languageArr?.map((language, index) => (
                <p
                  key={String(index) + language}
                  className="mr-2 text-base leading-6"
                >
                  {language.name}
                </p>
              ))}
            </div>
          </div>

          <div className="actions-button flex">
            <GitHubActionButton
              title={titleBranch}
              action={selectType}
              options={branchArr}
            />
            <div className="star-group flex justify-center items-center">
              <div className="starts-counter -mr-4 px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white">
                <p>{data?.repository.stargazerCount}</p>
              </div>
              {data?.repository && (
                <Button
                  action={handleClickStar}
                  title={title}
                  class={"stars-action-button bg-customGray hover:bg-gray-600"}
                />
              )}
            </div>
          </div>
        </div>

        <div className="commits-group">
          {descRepoArray?.map((commit, index) => {
            const authorName = commit.node.author.name;
            const login = commit.node.author.user?.login;
            const message = commit.node.message;
            const commitDate = commit.node.committedDate.split("T")[0];
            return (
              <div
                key={commit + String(index)}
                className="flex flex-col justify-between p-4 border border-black-100 mt-2 h-36"
              >
                <div className="flex">
                  <p className="mr-2">Name {authorName}</p>
                  <p>Login {login}</p>
                </div>
                <div>
                  <p>{message}</p>
                </div>
                <div className="flex w-full justify-end">
                  <p>{commitDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DescriptionRepository;
