const Notes = require("../models/notesModel");

const notesCtrl = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ userId: req.user.id });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, description } = req.body;
      const newNote = new Notes({
        title,
        description,
        userId: req.user.id,
      });
      await newNote.save();
      res.status(200).json({ message: "Created a note", newNote });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Note deleted" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, description } = req.body;
      const note = await Notes.findOneAndUpdate(
        { _id: req.params.id },
        { title, description }
      );
      res.status(200).json({ message: "Updated note" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findOne({ _id: req.params.id });
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

module.exports = notesCtrl;
