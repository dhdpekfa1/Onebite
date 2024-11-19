import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import styles from "./index.module.css";
import { InferGetStaticPropsType } from "next";
import { getAllBooks, getRandomBooks } from "@/apis/books";

// 1️⃣ 해당 경로로 요청
// 2️⃣  getStaticProps 동작 -> Bundle time에 미리 사전 render 되는 함수
export const getStaticProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([
    getAllBooks(),
    getRandomBooks(),
  ]);

  // 불러온 데이터를 props로서 Component에 전달
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
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
