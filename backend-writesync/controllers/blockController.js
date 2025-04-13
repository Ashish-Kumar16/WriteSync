import asyncHandler from "../utils/asyncHandler.js";
import Block from "../models/Block.js";

const getBlocks = asyncHandler(async (req, res) => {
  const blocks = await Block.find({
    page: req.params.pageId,
    user: req.user._id,
  }).sort("order");

  res.json(blocks);
});

const createBlock = asyncHandler(async (req, res) => {
  const { type, content, order, _id, ...rest } = req.body; // Destructure and ignore _id

  const block = await Block.create({
    type,
    content,
    order,
    page: req.params.pageId,
    user: req.user._id,
  });

  res.status(201).json(block);
});
const updateBlock = asyncHandler(async (req, res) => {
  const { type, content, order } = req.body;

  const block = await Block.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { type, content, order },
    { new: true, runValidators: true },
  );

  if (!block) {
    res.status(404);
    throw new Error("Block not found");
  }

  res.json(block);
});

const reorderBlocks = asyncHandler(async (req, res) => {
  const { blocks } = req.body;

  const updateOperations = blocks.map((block) => ({
    updateOne: {
      filter: { _id: block._id, user: req.user._id },
      update: { $set: { order: block.order } },
    },
  }));

  await Block.bulkWrite(updateOperations);
  res.json({ message: "Blocks reordered" });
});

const deleteBlock = asyncHandler(async (req, res) => {
  const block = await Block.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!block) {
    res.status(404);
    throw new Error("Block not found");
  }

  res.json({ message: "Block removed" });
});

export { getBlocks, createBlock, updateBlock, reorderBlocks, deleteBlock };
