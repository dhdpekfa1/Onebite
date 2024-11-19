// src/pages/api/revalidate.ts
import { NextApiRequest, NextApiResponse } from "next";

// index(Home) Page 요청을 받았을 때 재생성(revalidate)
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await res.revalidate("/"); // 인수로 전달한 경로를 revalidate
    return res.json({ revalidate: true }); // 재생성 완료 응답
  } catch (err) {
    res.status(500).send("Revalidation Failed");
    console.error(err);
  }
};
