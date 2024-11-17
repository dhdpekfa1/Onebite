import { BookData } from "@/types/types";

const BASE_URL = "http://localhost:12345";

// 모든 도서
export const getAllBooks = async (): Promise<BookData[]> => {
  try {
    const res = await fetch(`${BASE_URL}/book`);
    if (!res.ok) throw new Error();

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

// 랜덤(추천) 도서
export const getRandomBooks = async (): Promise<BookData[]> => {
  try {
    const res = await fetch(`${BASE_URL}/book/random`);
    if (!res.ok) throw new Error();

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

// 검색 도서
export const getSearchBooks = async (q: string): Promise<BookData[]> => {
  try {
    const res = await fetch(`${BASE_URL}/book/search?q=${q}`);
    if (!res.ok) throw new Error();

    return await res.json();
  } catch (err) {
    console.error(err);
    console.log("실패");
    return [];
  }
};

// 해당 도서
export const getOneBook = async (id: number): Promise<BookData | null> => {
  try {
    const res = await fetch(`${BASE_URL}/book/${id}`);
    if (!res.ok) throw new Error();

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
