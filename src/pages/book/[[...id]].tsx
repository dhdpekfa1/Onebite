import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  return <h1>Book Id: {id}</h1>;
};

export default Page;
