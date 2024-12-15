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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      router.back();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      router.back();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (dialog) {
        dialog.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [router]);

  return createPortal(
    <dialog
      onClick={handleBackdropClick}
      ref={dialogRef}
      className={styles.modal}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
