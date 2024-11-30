"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    // 검색어 두입 -> http://localhost:3000/search?q=두입
    router.push(`/search?q=${search}`); // 해당 검색어를 전달('두입')
  };

  return (
    <div>
      <input type="text" value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
};

export default Searchbar;
