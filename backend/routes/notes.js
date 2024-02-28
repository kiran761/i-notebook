const express = require('express');
const router = express.Router();
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser');
const { findByIdAndUpdate } = require('../models/User');

// ROUTE 1 : GET ALL THE NOTES
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id })
      res.json(notes)
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")

   }
})


// ROUTE 2 : ADD A NEW NOTE using Post
router.post('/addnote', fetchuser, [
   body('title', 'Enter a Valid title').isLength({ min: 3 }),
   body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {

   try {

      const { title, description, tag, date } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
         title, description, tag, user: req.user.id
      })

      const savedNote = await note.save()

      res.json(savedNote)

   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
   }
})

// ROUTE 3 : Updating Existing Route

router.put('/updatenote/:id', fetchuser, async (req, res) => {

   try {

      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description }
      if (tag) { newNote.tag = tag }

      //Find the Note to be updated and update

      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed")
      }

      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note })

   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
   }

})

// ROUTE 4 : DELETE NOTE
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

   try {


      //Find the Note to be deleted and delete
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }


      // Allow deletion only when user ows it
      if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed")
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ "Success": "Note Deleted", note: note })
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
   }
})
module.exports = router 