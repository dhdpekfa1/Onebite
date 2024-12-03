import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

/** 특정 페이지의 유형을 강제로 static | dynamic 페이지로 설정
 *  auto: 아무 것도 강제하지 않음 (기본값)
 *  force-dynamic:페이지를 강제로 dynamic 페이지로 설정
 *  force-static:페이지를 강제로 static 페이지로 설정 -> 동적 경로의 값은 빈 값(undefined)으로 설정됨
 *  error: 페이지를 강제로 static페이지로 설정 (설정하면 안되는 이유가 있을 경우 빌드 오류 발생) */
// export const dynamic = "";

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
