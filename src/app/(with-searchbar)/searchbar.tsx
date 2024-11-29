"use client";

import React, { useState, ChangeEvent } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  );
};

export default Searchbar;
