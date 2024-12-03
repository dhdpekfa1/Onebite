import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Suspense 컴포넌트로 감싸면 오직 client component에서만 실행
          해당 component의 비동기 작업이 완료될 때까지 미완료 상태,
          fallback Prop으로 전달한 대체 UI가 표시된다.*/}
      <Suspense fallback={<div>Loading... </div>}>
        {/* ClientSide에서 queryString을 불러왔을 때 미완료 상태 종료 */}
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
