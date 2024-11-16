import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
        <Link href={"/search"}>search</Link>
        {/* Programmatic Navigation */}
        <div>
          <button onClick={handleClick}>/test Page로 이동!</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
