const { test } = require('./house/test');
const { writeDataFile, read } = require('./house/filemanager');
const { genAuthCode } = require('./house/auth');

module.exports = {
  test,
  writeDataFile, read,
  genAuthCode,
};