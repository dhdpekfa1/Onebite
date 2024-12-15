import { ReactNode } from "react";
import Link from "next/link";

const Layout = ({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) => {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>/parallel</Link>
        &nbsp;
        <Link href={"/parallel/new-feed"}>/parallel/new-feed</Link>
      </div>
      {sidebar}
      {feed}
      {children}
    </div>
  );
};

export default Layout;
