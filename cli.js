#!/usr/bin/env node
const chalk = require('chalk');
const axios = require('axios');
const cheerio = require('cheerio');
const program = require('commander');


const searchWord = (word) => {
    
    axios.get('https://www.dictionary.com/browse/'+word).then((response) => {

        let $ = cheerio.load(response.data);

        let pronunciation = $('span.pron-spell-content.css-1ksa987.evh0tcl1').first().text().trim()
        let kind = $('span.luna-pos').first().text().trim().replace(',', '')
        let def = $('span.one-click-content.css-ibc84h.e1q3nk1v1').first().text().trim().replace('(', '').replace(')', '')
    
        console.log(chalk`{bold ${word}}`); 
        console.log(chalk`{green ${kind}} {blue ${pronunciation}}`);
        console.log(def);

    })
};

const wordOfTheDay = () => {
    
    axios.get('https://www.dictionary.com/e/word-of-the-day').then((response) => {

        let $ = cheerio.load(response.data);

        let word = $('div.otd-item-headword__word').first().text().trim()
        let pronunciation = $('div.otd-item-headword__pronunciation').first().text().trim()
        let kind = $('span.luna-pos').first().text().trim().replace(',', '');
        let def = $('div.otd-item-headword__pos > p').first().next().text().trim()

        console.log(chalk`{bold ${word}}`); 
        console.log(chalk`{green ${kind}} {blue ${pronunciation}}`);
        console.log(def);

    })
};

program
  .command('search <word>')
  .alias('s')
  .description('search a word in dictionary')
  .action((word) => {
        searchWord(word) 
  });


program
  .command('word')
  .description('word from the day')
  .action(() => {
    wordOfTheDay()
  });

program.parse(process.argv);