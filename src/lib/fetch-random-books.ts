import { BookData } from "@/types/types";

const fetchRandomBooks = async (): Promise<BookData[]> => {
  const url = "https://onebite-books-server-rose.vercel.app/book/rando";

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error();

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default fetchRandomBooks;
