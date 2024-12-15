import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal/modal";

const InterceptingBookPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Modal>
      <BookPage params={params} />
    </Modal>
  );
};

export default InterceptingBookPage;
