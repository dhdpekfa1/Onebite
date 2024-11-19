import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import styles from "./index.module.css";
import { InferGetStaticPropsType } from "next";
import { getAllBooks, getRandomBooks } from "@/apis/books";

// 1️⃣  기존 ISC 방식과 동일(+revalidate 프로퍼티 제거)
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
    // 2️⃣ revalidate 프로퍼티 제거
  };
};

// 3️⃣ Page Component 실행 -> (re-fresh) 사용자의 동작에 의해 변경
// ->  현재 설정은 `주소~api/revalidate` url로 요청 시 true 반환, 즉 새로고침 시 정보 변경
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
