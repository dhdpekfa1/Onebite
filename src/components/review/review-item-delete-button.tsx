"use client";

import { useActionState, useEffect, useRef } from "react";
import { deleteReviewAction } from "@/actions/delete-review-action";

const ReviewItemDeleteButton = ({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) => {
  // 버튼이 아닌 div || a 태그의 요소를 통해서 form 제출하기 위해 reference 객체 사용
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        /**  div 클릭 시 formTag 강제 제출 설정
         *   requestSubmit: 사용자가 submitBtn을 클릭한 것과 똑같이 동작(비교적 안전) */
        <div onClick={() => formRef.current?.requestSubmit()}>삭제</div>
      )}
    </form>
  );
};

export { ReviewItemDeleteButton };
