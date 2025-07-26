import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file, start, end } = req.body;
  if (!file || !start || !end) return res.status(400).json({ error: "Missing parameters" });

  const input = path.join(process.cwd(), "public", "recordings", file);
  const output = path.join("/tmp", `highlight_${Date.now()}.mp4`);
  const cmd = `ffmpeg -i "${input}" -ss ${start} -to ${end} -c copy "${output}"`;

  exec(cmd, async (err) => {
    if (err) return res.status(500).json({ error: "FFmpeg error", detail: err.message });

    const stats = fs.statSync(output);
    if (stats.size > 100 * 1024 * 1024) {
      fs.unlinkSync(output);
      return res.status(400).json({ error: "File too large (>100MB)" });
    }

    try {
      const result = await cloudinary.uploader.upload(output, {
        resource_type: "video",
        folder: "streamy_highlights",
      });
      fs.unlinkSync(output);
      return res.status(200).json({ url: result.secure_url });
    } catch (e: any) {
      return res.status(500).json({ error: "Upload failed", detail: e.message });
    }
  });
}
