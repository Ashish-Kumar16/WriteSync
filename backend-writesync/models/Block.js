import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "paragraph",
        "heading-1",
        "heading-2",
        "heading-3",
        "bulleted-list",
        "numbered-list",
        "to-do",
        "image",
        "divider",
        "code",
        "table",
        "quote",
        "callout",
        "embed",
      ],
      default: "paragraph",
    },
    content: String,
    order: Number,
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Block", blockSchema);