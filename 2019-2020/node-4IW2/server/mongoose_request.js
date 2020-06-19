const db = require('./lib/db');
const mongoose = require('mongoose');
const SakilaFilms = require('./models/SakilaFilms');
SakilaFilms.del
// CGET
//SakilaFilms.find().limit(10).then(docs => {
//  console.log("cget", docs);
//});
//
//// Insert
//const movie = new SakilaFilms({
//  Title: "TestMongoose",
//  Length: 15,
//  Rating: "PP"
//});
//movie.save().then(
//  result => console.log("insert movie", result)
//);
//
// Remove
//SakilaFilms.deleteMany({
//  Title: "TestMongoose"
//}).then(result => console.log("remove", result));

//Update document
//const movie = new SakilaFilms({
//  Title: "TestMongoose",
//  Length: 15,
//  Rating: "PP"
//});
//movie.save().then(result => {
//
//    SakilaFilms.findById(result._id).then(doc => {
//      doc.Title = doc.Title+"V2";
//      doc.save().then(docUpdated => console.log("updated document", docUpdated));
//    });
//
//  }
//);

////Aggregate
//SakilaFilms.aggregate([
//  {$match: {Category: "Horror"}},
//  {$group: {_id: "$Rating", total: {$sum: 1}}},
//  {$match: {total: {$gte: 10}}},
//  {$sort: {total: 1, _id: 1}}
//])
//.then(data=> console.log(data));