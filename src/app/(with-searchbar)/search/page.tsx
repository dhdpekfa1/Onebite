import { Suspense } from "react";
import { Metadata } from "next";
import { delay } from "@/util/delay";
import BookItem from "@/components/book-item/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";

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

// 현재 페이지의 메타 데이터를 동적으로 생성
export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> => {
  const { q } = await searchParams;
  return {
    title: `${q}: 한입 북스 검색`,
    description: `${q}의 검색 결과입니다.`,
    openGraph: {
      title: `${q}: 한입 북스 검색`,
      description: `${q}의 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <Suspense
      key={searchParams.q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q || ""} />{" "}
    </Suspense>
  );
}
