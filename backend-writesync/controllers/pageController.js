import asyncHandler from "../utils/asyncHandler.js";
import Page from "../models/page.js";

const getPages = asyncHandler(async (req, res) => {
  const pages = await Page.find({ user: req.user._id }).sort({ order: 1 });
  res.json(pages);
});

const createPage = asyncHandler(async (req, res) => {
  const { title, parentId } = req.body;
  const baseTitle = title || "New Page";
  let finalTitle = baseTitle;

  const existingPage = await Page.findOne({
    user: req.user._id,
    parent: parentId || null,
    title: baseTitle,
  });
  if (existingPage) {
    const count = await Page.countDocuments({
      user: req.user._id,
      parent: parentId || null,
      title: { $regex: `^${baseTitle} \\(\\d+\\)$` },
    });
    finalTitle = `${baseTitle} (${count + 1})`;
  }

  const page = await Page.create({
    title: finalTitle,
    content: "",
    user: req.user._id,
    parent: parentId,
    order: await Page.countDocuments({
      user: req.user._id,
      parent: parentId || null,
    }),
  });

  res.status(201).json(page);
});

const updatePage = asyncHandler(async (req, res) => {
  const { title, icon, content } = req.body;
  const page = await Page.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title, icon, content },
    { new: true, runValidators: true },
  );

  if (!page) {
    res.status(404);
    throw new Error("Page not found");
  }

  res.json(page);
});

const getPageById = asyncHandler(async (req, res) => {
  const page = await Page.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!page) {
    res.status(404);
    throw new Error("Page not found");
  }

  res.json(page);
});

const deletePage = asyncHandler(async (req, res) => {
  const page = await Page.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!page) {
    res.status(404);
    throw new Error("Page not found");
  }

  res.json({ message: "Page removed" });
});

export { getPages, createPage, updatePage, deletePage, getPageById };
