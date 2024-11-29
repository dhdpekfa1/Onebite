import { ReactNode } from "react";
import Searchbar from "./searchbar";

const SearchLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
};

export default SearchLayout;
