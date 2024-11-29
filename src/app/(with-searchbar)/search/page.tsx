// http://localhost:3000/search?q=한입
const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const { q } = await searchParams;
  return <div>검색어: {q}</div>; // 검색어: 한입
};

export default SearchPage;
