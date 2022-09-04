const logger = require('./logger');
const { config } = require('./config');
const { sleep } = require('./utils');
// const { clearTimeout } = require('timers');

// Ensure that any thrown error that I don't handle gets logged
process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Promise Rejection: ' + reason.stack));

logger.info('Applying Config: ' + JSON.stringify(config));

// Global objects
// let test = undefined;

const doSomething = async () => {
  logger.info('Attempting to do something');
};

// Main
(async () => {
  //sleep for a few seconds so that device state settles
  sleep(1000 * 5);

  // Set polling interval
  setInterval(async () => {
    logger.info(JSON.stringify(config))
  }, 5*1000);

  // Do Something
  try {
    await doSomething();
  } catch (err) {
    logger.error(err?.message);
  }
})();
