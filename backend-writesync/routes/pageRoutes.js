import express from "express";
import {
  getPages,
  createPage,
  updatePage,
  deletePage,
  getPageById,
} from "../controllers/pageController.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getPages).post(createPage);
router.route("/:id").get(getPageById).put(updatePage).delete(deletePage);

export default router;
