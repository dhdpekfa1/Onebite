import { ReviewEditor } from "@/components/review";
import { BookDetail, ReviewList } from "@/components/book";
import styles from "./page.module.css";

// export const dynamicParams = false;

export const generateStaticParams = () => {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
};

const BookPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className={styles.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor bookId={params.id} />
      <ReviewList bookId={params.id} />
    </div>
  );
};

export default BookPage;
