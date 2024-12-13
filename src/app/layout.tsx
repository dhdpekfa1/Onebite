import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";
import { ReactNode } from "react";

const Footer = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    return <footer>제작 @ollin</footer>;
  }
  const books: BookData[] = await res.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @ollin</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
