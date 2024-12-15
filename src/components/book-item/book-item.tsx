import Link from "next/link";
import Image from "next/image";
import type { BookData } from "@/types";
import styles from "./book-item.module.css";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={styles.container}>
      <Image
        src={coverImgUrl}
        width={80}
        height={105}
        alt={`${title} cover image`}
        priority
      />
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
}
