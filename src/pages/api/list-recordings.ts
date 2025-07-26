import { promises as fs } from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dir = path.join(process.cwd(), "public", "recordings");
  const files = await fs.readdir(dir);
  const mp4s = files.filter((f) => f.endsWith(".mp4"));
  res.status(200).json({ files: mp4s });
}
