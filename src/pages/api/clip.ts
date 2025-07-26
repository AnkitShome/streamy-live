import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import os from "os";
import { exec } from "child_process";
import streamifier from "streamifier";
import cloudinary from "@/lib/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { file, start, end } = req.body;
   if (!file || !start || !end) return res.status(400).json({ error: "Missing parameters" });

   const input = path.join(process.cwd(), "public", "recordings", file);
   const output = path.join(os.tmpdir(), `highlight_${Date.now()}.mp4`);
   const ffmpegPath = `"C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe"`;
   const cmd = `${ffmpegPath} -i "${input}" -ss ${start} -to ${end} -preset fast "${output}"`;

   exec(cmd, async (err) => {
      if (err) return res.status(500).json({ error: "FFmpeg error", detail: err.message });

      try {
         const buffer = fs.readFileSync(output);

         const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
               { resource_type: "video", folder: "streamy_highlights" },
               (error, result) => {
                  if (error) return reject(error);
                  resolve(result);
               }
            ).end(buffer);
         });

         fs.unlinkSync(output);
         return res.status(200).json({ url: (result as any).secure_url });
      } catch (e: any) {
         return res.status(500).json({ error: "Upload failed", detail: e.message });
      }
   });
}
