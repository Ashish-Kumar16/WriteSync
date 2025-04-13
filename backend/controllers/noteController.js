const Note = require("../models/note.js");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.userId,
    });
    await User.findByIdAndUpdate(req.userId, { $push: { notes: note._id } });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true },
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });

    await User.findByIdAndUpdate(req.userId, { $pull: { notes: note._id } });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
