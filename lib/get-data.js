const fs = require('fs');
const path = require('path');
const parsePost = require('./parse-post');
/**
  @description Read files files from a given path into an array.
  @param dirpath:String
  @returns {promise<array<string>>}
 */
module.exports = dirpath => {
  return Promise.resolve(fs.readdirSync(dirpath)
  .map(filename => path.join(dirpath, filename))
  .filter(filepath => fs.statSync(filepath).isFile())
  .map(filepath=>fs.readFileSync(filepath, 'utf8').toString())
  .map(parsePost));
};
