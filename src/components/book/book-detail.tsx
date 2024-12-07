import { BookData } from "@/types";
import { notFound } from "next/navigation";
import styles from "@/app/book/[id]/page.module.css";

const BookDetail = async ({ bookId }: { bookId: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
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
    <section>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subTitle}>{subTitle}</div>
      <div className={styles.author}>
        {author} | {publisher}
      </div>
      <div className={styles.description}>{description}</div>
    </section>
  );
};

export { BookDetail };
