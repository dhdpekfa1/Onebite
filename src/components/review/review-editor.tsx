"use client";

import { useActionState, useEffect } from "react";
import { createReviewAction } from "@/actions/create-review-action";
import styles from "./review-editor.module.css";

const ReviewEditor = ({ bookId }: { bookId: string }) => {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  // useActionState의 state 상태에 따라 re-render & 경고창
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      {/* server action을 위한 form에 server action 함수 전달 */}
      <form className={styles.form_container} action={formAction}>
        {/* props으로 전달 받은 bookId를 value로 지정 & hidden & readOnly 속성 사용*/}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          required
          name="content"
          placeholder="리뷰 내용을 입력하세요."
          disabled={isPending}
        />
        <div className={styles.submit_wrapper}>
          <input
            required
            name="author"
            placeholder="작성자"
            disabled={isPending}
          />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성"}
          </button>
        </div>
      </form>
    </section>
  );
};

export { ReviewEditor };
