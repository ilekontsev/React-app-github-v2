import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Loading from "../Loading/Loading";

import { FormData } from "../../Interfaces/Interfaces";

import { checkToken } from "../../api/Oauth";

const Login = () => {
  const [tokenGit, setTokenGit] = useState("");
  const { isLoading, isError, data, isFetched } = checkToken(tokenGit);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  useEffect(() => {
    const getToken = localStorage.getItem("token" || "");
    if (getToken) {
      setTokenGit(getToken);
    }
  }, []);

  const onSubmit = handleSubmit(({ token }) => {
    if (token.trim().length) {
      setTokenGit(token);
    }
  });

  if (isLoading) {
    return <Loading />;
  } else if (!isError && data && isFetched) {
    localStorage.setItem("token", tokenGit);
    localStorage.setItem("userName", data.viewer.login);
    setValue("token", "");
    router.push("/repositories");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center items-center h-screen"
    >
      <label className="text-white mr-4">Token</label>
      <input
        {...register("token")}
        className={
          "bg-customBlack border-gray-600 border focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md text-gray-100 px-4"
        }
      />
      <input
        type="submit"
        className="inline-flex ml-4 mr-2 items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-400"
      />
    </form>
  );
};

export default Login;
