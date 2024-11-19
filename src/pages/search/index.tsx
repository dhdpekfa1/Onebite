import React, { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
// import {  GetStaticPathsContext, InferGetStaticPropsType } from "next";
// import { getSearchBooks } from "@/apis/books";
import { BookData } from "@/types/types";
import { useRouter } from "next/router";
import { getSearchBooks } from "@/apis/books";

// 검색 결과를 서버로부터 불러오는 동작 사용 불가(build time에 알 수 없기 때문)
// export const getStaticProps = async (context: GetStaticPathsContext) => {
//   const q = context.query.q;

//   const books = await getSearchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

const Page = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter(); // 기존의 react router (client)방식 사용
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await getSearchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      {books.map((book: BookData) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

Page.getLayout = (children: ReactNode) => {
  return <SearchableLayout>{children}</SearchableLayout>;
};

export default Page;
