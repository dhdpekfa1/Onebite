import { InferGetStaticPropsType } from "next";
import React from "react";

// 1️⃣ 해당 경로로 요청
// 2️⃣  getServerSideProps함수 동작 -> build time에 딱 한번만 생성되는 함수
export const getStaticProps = () => {
  // 서버로부터 불러온 데이터
  const data = "...";

  // 객체 형태로 반환 -> Page Component에 전달
  return {
    // props 객체 프로퍼티를 포함한 단 하나의 객체 형태
    props: {
      data,
    },
  };
};

// 3️⃣ Page Component 실행 -> 반환한 data를 prop으로 받아서 사용
const Page = ({
  data,
}: // 반환 값의 타입을 추론해주는 내장 기능
InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  return <div>Page</div>;
};

export default Page;
