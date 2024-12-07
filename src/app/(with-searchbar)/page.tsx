import { Suspense } from "react";
import BookItem from "@/components/book-item/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

const AllBooks = async () => {
  await delay(1500);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다..</div>;
  }
  const allBooks: BookData[] = await res.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

const RecoBooks = async () => {
  await delay(3000);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // 3초마다 재검증
  );
  if (!res.ok) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다..</div>;
  }
  const recoBooks: BookData[] = await res.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

// Suspense 사용을 위해 강제로 동적 페이지로 변경
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>

        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={5} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
