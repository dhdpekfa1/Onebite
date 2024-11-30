/** client component 없이 server component만 존재하는  형태
 *  -> JS Bundle없이 RSC Payload만 전달  */
const BookPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>book/[id]/BookPage: {id}</div>;
};

export default BookPage;
