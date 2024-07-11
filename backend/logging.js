const path = require('path');
const { statSync, mkdirSync, writeFileSync } = require('fs');
const bunyan = require('bunyan');

const logDirPath = path.join(__dirname, '../logs');
const logPath = path.join(logDirPath, 'app.log');

// Ensure log directory and file exist
try {
  statSync(logPath);
} catch (err) {
  mkdirSync(logDirPath, { recursive: true });
  writeFileSync(logPath, '');
}

// Create the logger
const log = bunyan.createLogger({
  name: 'ex4Broker',
  level: 'info',
  serializers: bunyan.stdSerializers,
  streams: [
    { path: logPath },
    { stream: process.stdout, color: 'blue' },
  ],
});

module.exports = log;
