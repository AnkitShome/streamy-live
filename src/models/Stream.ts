import mongoose from 'mongoose';

const StreamSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: String,
   videoUrl: String,
   userId: String,
   createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Stream
   || mongoose.model('Stream', StreamSchema);
