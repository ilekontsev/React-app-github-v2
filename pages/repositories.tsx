import React from "react";

import Header from "../src/components/Header/Header";
import Content from "../src/components/Content/Content";

import { useGetUserData } from "../src/api/requests";

const Repositories = () => {
  const { data } = useGetUserData();

  return (
    <div className={"repositories"}>
      {data && (
        <>
          <Header userData={data} />
          <Content userData={data} />
        </>
      )}
    </div>
  );
};

export default Repositories;
