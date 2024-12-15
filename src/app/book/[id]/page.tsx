import { Metadata } from "next";
import { ReviewEditor } from "@/components/review";
import { BookDetail, ReviewList } from "@/components/book";
import { BookData } from "@/types";
import styles from "./page.module.css";

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const books: BookData[] = await res.json();

  return books.map((book) => ({
    id: book.id.toString(),
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const resolvedParams = await params;
  const id = resolvedParams.id;

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

const BookPage = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <div className={styles.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
};

export default BookPage;
