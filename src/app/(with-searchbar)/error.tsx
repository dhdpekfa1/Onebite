/** client component로 설정
 *  -> client component는 server와 client에서 모두 실행
 *  -> server측, client측 모든 오류에 대응하기 위해 client component로 설정 */
"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

/** Next에서 Error component에게 제공하는 Props
 *  error: 현재 발생한 오류의 정보를 전달
 *  reset: error가 발생한 Page를 복귀하기 위해 다시 rerender 시도 */
const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      {/* reset 메서드 사용: client 내부에서 발생한 오류만 복구 가능
       <button onClick={() => reset()}>다시 시도</button> */}

      {/* server component만 새롭게 re-render 요청 후 reset 메서드 호출 */}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 server component를 다시 실행 요청
            reset(); // 에러 상태를 초기화 + client component re-render
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;
