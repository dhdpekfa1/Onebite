import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const res = await fetch(
    // 검색어로부터 query를 불러와서 사용하는 동적 경로
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`,
    // 페이지는 계속 다시 생성되지만 검색 결과는 캐싱 가능
    // -> 한 번 검색한 검색어의 경우 조금 더 빠른 데이터 응답 가능
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
}
