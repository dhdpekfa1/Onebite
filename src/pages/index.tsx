// pages/index.tsx -> searchBar Layout이 필요한 페이지
import { ReactNode } from "react";
import styles from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";

const Home = () => {
  return (
    <>
      <h1 className={styles.idx}>Index - Home</h1>
    </>
  );
};

// PageComponent 에서 getLayout 호출 -> LayoutComponent로 감싸서 전달
Home.getLayout = (children: ReactNode) => {
  return <SearchableLayout>{children}</SearchableLayout>;
};

export default Home;
