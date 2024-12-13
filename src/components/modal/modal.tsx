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
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
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
