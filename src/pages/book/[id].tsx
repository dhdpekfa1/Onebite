import React from "react";
import styles from "./book-detail.module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { getOneBook } from "@/apis/books";
import { useRouter } from "next/router";

// 1️⃣ 현재 해당 페이지에 존재할 수 있는 경로를 설정
export const getStaticPaths = () => {
  // 현재 페이지에 어떤 경로(url Parameter)들이 존재할 수 있는지 배열로 반환
  return {
    paths: [
      { params: { id: "1" } }, // params 값은 반드시 문자열
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // 지정한 경로(url Parameter) 값으로 해당하지 않는 url 접속 요청에 대한 대비책
    fallback: false,
    /**  fallback option:
     * false: 404 Not-found 반환
     * 'blocking': 즉시 생성(Like SSR) 후 자동 저장
     * true: 즉시 생성 + props 없는 페이지 반환 -> props 계산 -> props만 따로 반환
     */
  };
};

// 2️⃣ 설정된 경로에 해당하는 페이지들을 일일이 호출 -> 사전에 여러 개의 페이지 렌더링
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await getOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      book,
    },
  };
};

const Page = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (router.isFallback) return "로딩중입니다.";
  if (!book) return "문제가 발생했습니다. 다시 시도해주세요.";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={styles.container}>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt="cover image" />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.author}>
        {author} | {publisher}
      </div>

      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default Page;
