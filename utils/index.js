const { test } = require('./house/test');
const { writeDataFile, read } = require('./house/filemanager');
const { genAuthCode } = require('./house/auth');
const { validateFormatting } = require('./house/postAuth');
const { myLogger } = require('./house/logger');
const { times } = require('./house/examples');

module.exports = {
  test,
  writeDataFile, read,
  genAuthCode,
  validateFormatting,
  myLogger,
  times
};