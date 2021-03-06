'use strict';

var winston = require('winston');
var loggingTransports = [];
var exceptionTransports = [];
var levels = {
  info: 0,
  email: 1,
  warn: 2,
  error: 3
};
var colors = {
  info: 'green',
  email: 'magenta',
  warn: 'yellow',
  error: 'red'
};

loggingTransports.push(
  new (winston.transports.Console)({
    json: false,
    timestamp: true,
    colorize: true,
    stringify: function stringify(obj) {
      return JSON.stringify(obj);
    }
  })
);

exceptionTransports.push(
  new (winston.transports.Console)({
    json: false,
    timestamp: true,
    colorize: true,
    stringify: function stringify(obj) {
      return JSON.stringify(obj);
    }
  })
);

var transports = {
  levels: levels,
  transports: loggingTransports,
  exceptionHandlers: exceptionTransports,
  exitOnError: true
};

delete transports.exceptionHandlers;

var logger = new (winston.Logger)(transports);

winston.addColors(colors);

module.exports = logger;
