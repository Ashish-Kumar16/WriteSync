import express from "express";
import {
  getBlocks,
  createBlock,
  updateBlock,
  reorderBlocks,
  deleteBlock,
} from "../controllers/blockController.js";
// import protect from "../middlewares/auth.js";

const router = express.Router();
router.route("/:pageId/blocks").get(getBlocks).post(createBlock);

router.route("/:pageId/blocks/:id").patch(updateBlock).delete(deleteBlock);

router.route("/:pageId/blocks/reorder").put(reorderBlocks);

export default router;
