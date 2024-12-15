import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal/modal";

const InterceptingBookPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;
  return (
    <Modal>
      <BookPage params={resolvedParams} />
    </Modal>
  );
};

export default InterceptingBookPage;
