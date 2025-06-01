import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.DATABASE_URL || "mongodb://mongo:VfDNQuBVwvVoXogtAurjpyoXTMpeseTR@turntable.proxy.rlwy.net:30038";

mongoose.connect(MONGO_URI, {
  // useNewUrlParser: true, // Not needed in mongoose 6+
  // useUnifiedTopology: true, // Not needed in mongoose 6+
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose; 