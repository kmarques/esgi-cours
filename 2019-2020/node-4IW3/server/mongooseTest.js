const mongoose = require('./lib/db');
const SakilaFilm = require('./models/SakilaFilms');

// CGET
//SakilaFilm
//  .find()
//  .limit(2)
//  .then(docs => console.log("cget", docs));
//
//// Insert
//const movie = new SakilaFilm({
//  Title: "TestMongoose",
//  Length: 100
//});
//movie.save().then(docInserted => console.log("insertion", docInserted));

// Remove
//SakilaFilm.deleteMany({Title: "TestMongoose"})
//  .then(metadata => console.log("deletion", metadata));
// movie.remove()

//const movieU = new SakilaFilm({
//  Title: "TestMongoose",
//  Length: 100
//});
//movieU.save().then(docInserted => {
//
//  // Update
//  SakilaFilm.findById(docInserted._id).then(doc => {
//    doc.Title = "TestMongooseV2";
//    doc.save().then(docUpdated => console.log("modification", docUpdated));
//  });
//
//});

SakilaFilm.aggregate([
  {$match: {Category: 'Horror'}},
  {$group: {_id: "$Rating", total: {$sum: 1}}},
  {$match: {total: {$gte: 10}}},
  {$sort: {total: -1, _id: 1}},
  {$project: {total: 1, _id: 0}}
]).then(result => console.log(result));