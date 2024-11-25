import { BookData } from "@/types/types";

const fetchOneBook = async (id: number): Promise<BookData | null> => {
  const url = `https://onebite-books-server-rose.vercel.app/book/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default fetchOneBook;
