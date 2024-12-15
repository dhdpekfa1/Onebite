import { ReviewEditor } from "@/components/review";
import { BookDetail, ReviewList } from "@/components/book";
import { BookData } from "@/types";
import styles from "./page.module.css";

// export const dynamicParams = false;

export const generateStaticParams = () => {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  // 필요한 정보(data) 기반 작성 시 내부에서 API 호출 가능
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const book: BookData = await res.json();

  return {
    title: `${book.title} - 한입북스`,
    description: book.description,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: book.description,
      images: [book.coverImgUrl],
    },
  };
};

const BookPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className={styles.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
};

export default BookPage;
