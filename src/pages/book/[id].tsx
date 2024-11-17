import React from "react";
import styles from "./book-detail.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getOneBook } from "@/apis/books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;

  const book = await getOneBook(Number(id));
  return {
    props: {
      book,
    },
  };
};

const Page = ({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
