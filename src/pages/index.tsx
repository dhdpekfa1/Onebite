import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import styles from "./index.module.css";
import { InferGetStaticPropsType } from "next";
import { getAllBooks, getRandomBooks } from "@/apis/books";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([
    getAllBooks(),
    getRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      randomBooks,
    },
  };
};

const Home = ({
  allBooks,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        {/* 태그 내부에 기존 HTML의 metaData 작성 */}
        <title>한입 북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
      <div className={styles.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {randomBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
};

Home.getLayout = (children: ReactNode) => {
  return <SearchableLayout>{children}</SearchableLayout>;
};

export default Home;
