const express = require('express');
const responses = require('./responses');


module.exports = function() {

  var app = express.Router();

  var nextResponse = null;
  function getNextResponse() {
    return nextResponse;
  }


  responses.handlers(app, getNextResponse);

  const specialResponses = [].concat(
    responses.specialResponses
  );

  function renderPage(res) {
    res.render('../layout/main.ejs', {
      title: 'Service Mock API',
      specialResponses: specialResponses,
      nextResponse: nextResponse
    });
  }

  app.get('/action/:nextAction', function(req, res) {
    nextResponse = req.params.nextAction;
    renderPage(res);
  });

  app.get('/', function(req, res) {
    nextResponse = null;
    renderPage(res);
  });

  app.get('/healthz', function(req, res) {
    return res.status(200).json({});
  });

  return app;

};
