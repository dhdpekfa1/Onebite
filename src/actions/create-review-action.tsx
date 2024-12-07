"use server";
import { delay } from "@/util/delay";
import { revalidateTag } from "next/cache";

// 첫 번째 인수로 useActionState의 state가 전달 -> 사용하지 않을 때는 _: any 사용
export const createReviewAction = async (state: any, formData: FormData) => {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 모두 입력해주세요.",
    };
  }

  try {
    await delay(2000);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    if (!res.ok) throw new Error(res.statusText);

    revalidateTag(`review-${bookId}`);
    return { status: true, error: "" };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 등록에 실패했습니다. : ${err}`,
    };
  }
};
