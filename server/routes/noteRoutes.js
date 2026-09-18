const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    return res.status(201).json(note);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
