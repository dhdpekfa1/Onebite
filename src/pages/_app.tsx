import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Programmatic하게 이동시키는 페이지에 대해서도  Pre-fetching이 필요
  // -> router객체의 prefetch 메서드를 사용
  useEffect(() => {
    router.prefetch("/test"); // ('/미리 불러올 경로')
  }, []);

  const handleClick = () => {
    router.push("/test"); // push('/이동할 경로') 작성
  };

  return (
    <>
      <header>
        {/* CSL - Link Component 사용 */}
        <Link href={"/"}>Home</Link>
        &nbsp;
        <Link href={"/book"}>book</Link>
        &nbsp;
        {/* Pre-fetching이 필요하지 않을 때 prefetch 속성에 false 전달 */}
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        {/* Programmatic Navigation */}
        <div>
          <button onClick={handleClick}>/test Page로 이동!</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
