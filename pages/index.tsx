import React from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  router.push("/auth/sign-in");
  return <div />;
};
export default index;
