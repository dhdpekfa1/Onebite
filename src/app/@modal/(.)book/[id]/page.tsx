import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal/modal";

const InterceptingBookPage = (props: any) => {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
};

export default InterceptingBookPage;
