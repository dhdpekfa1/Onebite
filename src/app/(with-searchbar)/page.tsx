import { Suspense } from "react";
import { Metadata } from "next";
import { delay } from "@/util/delay";
import BookItem from "@/components/book-item/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import style from "./page.module.css";

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

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "한입 북스",
  description: "한입 북스에 저장된 도서를 만나보세요.",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 저장된 도서를 만나보세요.",
    images: ["/thumbnail.png"],
  },
};

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
