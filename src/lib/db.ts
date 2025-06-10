import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('MONGODB_URI not set')

export async function connectToDatabase() {
   if (mongoose.connection.readyState >= 1) return;
   await mongoose.connect(MONGODB_URI);
}
