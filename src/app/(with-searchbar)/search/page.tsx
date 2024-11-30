import ClientComponent from "@/components/client-component";

/** client component와 server component를 모두 포함하는 형태
 *  -> JS Bundle과 RSC Payload가 함께 전달
 */
const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) => {
  const { q } = await searchParams;
  return (
    <div>
      검색어: {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
};

export default SearchPage;
