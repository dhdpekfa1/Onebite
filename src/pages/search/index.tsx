import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter(); // useRouter 훅을 사용 -> router 변수에 Router 객체를 저장
  const { q } = router.query; // 구조분해 할당으로 꺼내서 사용
  // const q = router.query.q // 이렇게도 사용 가능

  return <h1>query: {q} </h1>;
};

export default Page;
