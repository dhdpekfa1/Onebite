import { Suspense } from "react";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

const SearchResult = async ({ q }: { q: string }) => {
  await delay(1500);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!res.ok) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다..</div>;
  }
  const searchBooks: BookData[] = await res.json();
  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    /** 비동기 작업을 하는 컴포넌트(SearchResult)를 감싸서 사용
     *  -> SearchResult 컴포넌트는 스트리밍 되도록 자동 설정
     *  -> Loading.tsx와 마찬가지로 경로가 변경될 때만 적용, 키값 설정 시 키값이 변경될 때마다 적용
     *  fallback: 로딩중일 때 보여줄 대체 UI
     *  key: 전달한 키값이 변경될 때마다 다시 로딩 상태 설정
     */
    <Suspense
      key={searchParams.q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q || ""} />{" "}
      {/* 비동기 작업을 수행하는 SearchResult  */}
    </Suspense>
  );
}
