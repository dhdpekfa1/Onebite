import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

/** component를 각각 AllBooks, RecoBooks로 분리
 *  -> fetching 각각 한 번만 실행*/
const AllBooks = async () => {
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // 3초마다 재검증
    // { cache: "force-cache" } // 첫 요청 시 결과를 무조건 캐싱, 이후 호출x
    //  { cache: "no-store" }   // caching 안함 (defaultValue)
    // { next: { tags: '[a]'} } // 요청이 들어왔을 때 data를 최신화
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

/** 한 컴포넌트에서 여러 개의  date fetching이 일어나는 경우
 *  컴포넌트 분리 후 import, 해당 component 사용 */
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
