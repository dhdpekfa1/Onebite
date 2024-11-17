import React, { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSearchBooks } from "@/apis/books";
import { BookData } from "@/types/types";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  console.log("context", context);

  const q = context.query.q;

  const books = await getSearchBooks(q as string);

  return {
    props: { books },
  };
};

const Page = ({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
