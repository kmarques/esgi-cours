const Scrapper = require('./lib/Scrapper');
const {Pokemon} = require('./models');
//const url = 'https://pokeapi.co/api/v2/pokemon/';
const url = 'https://fr.wikipedia.org/wiki/Liste_des_Pok%C3%A9mon';
const requestOptions = {};

//const scrap = Scrapper(
//  url, requestOptions,
//  data => data.results,
//  data => {
//    data.forEach(pokemon => {
//      (new Pokemon(pokemon)).save();
//    });
//  }
//);
const scrap = Scrapper(
  url, requestOptions,
  $ => {
    let results = []
    $(".colonnes ol li>a")
      .each(function(index, element) {
        results.push({
          name: $(element).text(),
          url: $(element).attr('href'),
          source: url
        });
      });
    return results;
  },
  data => {
    //Pokemon.
    data.forEach(pokemon => {
      Pokemon.findOneAndUpdate({name: pokemon.name}, pokemon, {
        upsert: true,
        new: true,
        runValidators: true
      }).then(data => console.log(data));
    });
  }
);

scrap.end();