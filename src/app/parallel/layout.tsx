import { ReactNode } from "react";
import Link from "next/link";

const Layout = ({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode; // app/parallel/@sidebar/page.tsx
  feed: ReactNode; // app/parallel/@feed/page.tsx
}) => {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>/parallel</Link>
        &nbsp;
        <Link href={"/parallel/new-feed"}>/parallel/new-feed</Link>
      </div>
      {/* 기본 페이지 컴포넌트인 children과 함께 병렬로 렌더링 */}
      {sidebar}
      {feed}
      {children}
    </div>
  );
};

export default Layout;
