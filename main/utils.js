// const logger = require('./logger');
// const { config } = require('./config');

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = { sleep };
