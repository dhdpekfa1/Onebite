import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import styles from "./index.module.css";
import { InferGetServerSidePropsType } from "next";
import { getAllBooks, getRandomBooks } from "@/apis/books";

// 1️⃣ 해당 경로로 요청
// 2️⃣  getServerSideProps함수 동작 -> 컴포넌트보다 먼저 실행되는 함수
export const getServerSideProps = async () => {
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

// 3️⃣ Page Component 실행
const Home = ({
  allBooks,
  randomBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
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
  );
};

Home.getLayout = (children: ReactNode) => {
  return <SearchableLayout>{children}</SearchableLayout>;
};

export default Home;
