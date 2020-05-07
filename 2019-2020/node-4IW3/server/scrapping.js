const fs = require('fs');
const Scrapper = require('./lib/Scrapper');
const connection = require('./lib/db.js');
const HttpCode = require('./models/HttpCode');

//const processData = (data) => {
//  // date = NOW - 1 day
//  const date = new Date();
//  date.setDate(date.getDate() -1);
//
//  let result = [];
//  for (country in data) {
//    const stats = data[country];
//    
//    const yesterday = stats.find(stat => stat.date === (date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()))
//result.push({
//      country,
//      ...yesterday
//    });    
//  }
///* {country: "France", nb_cas: "130"} */
//  return result;
//}
//
//const saveResult = (data) => {
//  const csvHeader = Object.keys(data[0]).join(',');
//  const csvValues = data.map(stat => Object.values(stat).join(','));
//  fs.writeFileSync('./stat.csv', csvHeader + "\n" + csvValues.join("\n"));
//}
//
//const req = Scrapper('https://pomber.github.io/covid19/timeseries.json', {}, processData, saveResult);
//req.end();

const processData2 = ($) => {
  const data = [];
  $('.wikitable tbody tr:not(:first-child)').each((index, tr)=> {

    const fields = $(tr).find('th,td');
    data.push({
      code: fields.eq(0).text().trim(),
      message: fields.eq(1).text().trim(),
      signification: fields.eq(2).text().trim()
    })
  });

  return data;
}

const saveResult2 = data => {
  Promise.all(data.map(datum => {
    const httpCode = new HttpCode(datum);
    return httpCode.save();
  })).then(() => console.log('data saved'));
}

const req2 = Scrapper('https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP', {}, processData2, saveResult2);
req2.end();