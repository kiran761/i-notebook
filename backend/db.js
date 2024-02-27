const mongoose = require('mongoose');

// connectToMongo().catch(err => console.log(err));

const connectToMongo= () => {
   mongoose.connect('mongodb://localhost:27017/iNoteBook');
  console.log("Connected Successfully");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connectToMongo;