// http://localhost:3000/book/100
const BookPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>book/[id]/BookPage: {id}</div>; // book/[id]/BookPage: 100
};

export default BookPage;
