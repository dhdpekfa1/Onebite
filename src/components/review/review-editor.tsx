"use client";

import { useActionState, useEffect } from "react";
import { createReviewAction } from "@/actions/create-review-action";
import styles from "./review-editor.module.css";

const ReviewEditor = ({ bookId }: { bookId: string }) => {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={styles.form_container} action={formAction}>
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
