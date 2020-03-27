const mongoose = require('./lib/db');
const SakilaFilm = require('./models/SakilaFilms');

// CGET
SakilaFilm
  .find()
  .limit(2)
  .then(docs => console.log("cget", docs));

// Insert
const movie = new SakilaFilm({
  Title: "TestMongoose",
  Length: 100
});
movie.save().then(docInserted => console.log("insertion", docInserted));

// Remove
//SakilaFilm.remove({Title: "TestMongoose"})
//SakilaFilm.deleteMany({Title: "TestMongoose"})
//  .then(metadata => console.log("deletion", metadata));

// Update
const movieU = new SakilaFilm({
  Title: "TestMongoose",
  Length: 100
});
movieU.save().then(docInserted => {

  SakilaFilm.findById(docInserted._id).then(doc => {
    doc.Title = "TestMongooseV2";
    doc.save().then(docUpdated => console.log("modification", docUpdated));
  });

});