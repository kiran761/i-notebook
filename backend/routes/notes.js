const express = require('express');
const router = express.Router();
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')
const fetchuser = require('../middleware/fetchuser')

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

module.exports = router 