import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal/modal";

/** 현재 경로: app/(.)book/[id]/page.tsx
 * 가로챌 경로: app/book/[id]/page.tsx
 * - 책 클릭(Link)으로 book -> [id] page 이동 시 intercept
 * - 그 상태에서 다시 새로고침 시 정상 페이지 동작 (초기 접속 요청이 됨)
 * -> 즉 client side rendering 방식으로 요청 시 intercepting route 동작
 *     ex: <Link /> || router.push() */
const InterceptingBookPage = (props: any) => {
  return (
    <div>
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
};

export default InterceptingBookPage;
