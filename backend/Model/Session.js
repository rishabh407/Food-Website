import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  refreshToken: String,
  expiresAt: Date
});

export default mongoose.model("Session", sessionSchema);
