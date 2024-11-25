import React from "react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./book-detail.module.css";
import fetchOneBook from "@/lib/fetch-one-book";

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
    fallback: true,
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
  const book = await fetchOneBook(Number(id));

  // 존재하지 않는 데이터 조회 시 404 Not-found 반환 설정
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

  if (router.isFallback) {
    return (
      <>
        <Head>
          {/* 태그 내부에 기존 HTML의 metaData 작성 */}
          <title>한입 북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요."
          />
        </Head>
        <div>로딩중입니다...</div>
      </>
    );
  }

  if (!book) return "문제가 발생했습니다. 다시 시도해주세요.";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        {/* 태그 내부에 기존 HTML의 metaData 작성 */}
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
};

export default Page;
