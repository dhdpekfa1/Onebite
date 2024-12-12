// app/components/modal.tsx
"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import styles from "./modal.module.css";

const Modal = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal(); // 모달 오픈
      dialogRef.current?.scrollTo({
        // 스크롤 위치 최상단
        top: 0,
      });
    }
  }, []);

  //
  /** createPortal
   * layout component에 <div id='modal-root'/> 작성 (rendering될 위치)
   * 1 번째 인수: Modal 컴포넌트의 렌더링 결과 (<dialog></dialog>)
   * 2 번째 인수: rendering 될 위치인 DOM 요소 (<div id='modal-root'/>)
   */
  return createPortal(
    //
    <dialog
      onClose={() => router.back()} // ESC keyDown
      onClick={(e) => {
        // 모달 바깥 영역 클릭 -> 뒤로가기
        if (e.target.nodeName === "DIALOG") {
          router.back();
        }
      }}
      ref={dialogRef}
      className={styles.modal}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement //
  );
};

export default Modal;
