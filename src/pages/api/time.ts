// src/pages/api/time.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.json({ time: date.toLocaleString() });
}
// ~/api/time 경로(URL) 접근 시 json 형태의 response 확인 가능
