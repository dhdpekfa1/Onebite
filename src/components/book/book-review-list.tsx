import { ReviewData } from "@/types";
import { ReviewItem } from "../review";

const ReviewList = async ({ bookId }: { bookId: string }) => {
  // fetch 함수의 두 번째 인자로 tags 전달
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    // tags: 특정 태그를 붙일 수 있도록 하는 옵션
    // -> 붙은 태그를 통해 데이터 캐시 초기화 || 재검증 설정 가능
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
