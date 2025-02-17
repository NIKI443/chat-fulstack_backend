import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});
export default mongoose.model("Group", GroupSchema);
