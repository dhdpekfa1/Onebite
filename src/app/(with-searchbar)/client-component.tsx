import { ReactNode } from "react";

// server-component를 사용해야할 때는 children Prop으로 사용
const ClientComponent = ({ children }: { children: ReactNode }) => {
  console.log("클라이언트 컴포넌트");
  return <div>{children}</div>;
};

export default ClientComponent;
