import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { getSearchBooks } from "@/apis/books";
import { BookData } from "@/types/types";

const Page = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const { q } = router.query;

  // 검색 결과 불러오기
  const fetchSearchResult = async () => {
    if (q) {
      const data = await getSearchBooks(q as string);
      setBooks(data);
    }
  };

  useEffect(() => {
    console.log("검색 쿼리:", q);
    fetchSearchResult();
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입 북스 - 검색 결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색 결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
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
