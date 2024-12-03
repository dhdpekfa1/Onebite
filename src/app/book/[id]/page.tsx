import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

// generateStaticParams에서 반환환 경로 외 동적 경로 생성x -> 404
// export const dynamicParams = false;

/** 정적인 parameter를 생성하는 함수(export 필수)
 *  -> 아래 Page 컴포넌트 내부에 데이터 캐시 설정이 없다라도 해당 함수를 사용 시
 *     해당 페이지는 무조건 static page로 강제 설정 */
export const generateStaticParams = () => {
  // 존재할 수 있는 동적 경로(url parameter)를 문자열로 작성
  // -> 빌드 타임에 해당 parameter를 읽고 parameter에 해당하는 페이지를 정적 생성
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
  // -> 다른 id로 접근 시 실시간 요청, 생성되어 Full Route Cache로 저장
};

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  // generateStaticParams 함수를 사용했기 때문에 별도의 데이터 캐시 설정 없어도 1, 2, 3 페이지는 정적 생성
  const res = await fetch(
    //
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
  );
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return <div>데이터를 불러오는 중 오류가 발생했습니다..</div>;
  }
  const book: BookData = await res.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
