// src/pages/_app.tsx - (root)
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "@/components/global-layout";
import { ReactNode } from "react";
import { NextPage } from "next";

// 기존 제공하는 NextPge 타입에 getLayout 타입 추가
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  // Component에서 전달한 getLayout을 변수로 선언
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <GlobalLayout>
      {/* getLayout 호출 */}
      {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}
