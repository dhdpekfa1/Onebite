import { ReviewData } from "@/types";
import { ReviewItem } from "../review";

const ReviewList = async ({ bookId }: { bookId: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );

  if (!res.ok) throw new Error(`Review fetch failed: ${res.status}`);
  const reviews: ReviewData[] = await res.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
};
export { ReviewList };
