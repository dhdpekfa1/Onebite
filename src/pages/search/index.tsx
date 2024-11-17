import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

const Page = () => {
  const router = useRouter(); // useRouter 훅을 사용 -> router 변수에 Router 객체를 저장
  const { q } = router.query; // 구조분해 할당으로 꺼내서 사용

  return (
    <div>
      <h1>query: {q} </h1>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

Page.getLayout = (children: ReactNode) => {
  return <SearchableLayout>{children}</SearchableLayout>;
};

export default Page;
