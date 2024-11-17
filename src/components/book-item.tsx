import React from "react";
import Link from "next/link";
import { BookData } from "@/types/types";
import styles from "./book-item.module.css";

const BookItem = ({
  id,
  title,
  subTitle,
  // description,
  author,
  publisher,
  coverImgUrl,
}: BookData) => {
  return (
    <Link href={`book/${id}`} className={styles.container}>
      <img src={coverImgUrl} alt="cover image" />
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
        <br />
        <div className={styles.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
