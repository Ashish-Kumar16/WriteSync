import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    icon: {
      type: String,
      default: "📄",
    },
    content: {
      type: String,
      default: "",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      index: true,
    },
    order: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
    versionKey: false,
  },
);

pageSchema.index(
  { user: 1, parent: 1, title: 1 },
  {
    unique: true,
    name: "unique_page_title_per_parent_user",
    partialFilterExpression: {
      title: { $exists: true },
      user: { $exists: true },
    },
  },
);

export default mongoose.model("Page", pageSchema);
