import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  // Page component에 자동으로 props로 제공되는 현재 페이지의 query string
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`
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
