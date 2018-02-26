"use strict";
let ballResponses = [
  'It is certain',
'It is decidedly so',
'Without a doubt',
'Yes definitely',
'You may rely on it',
'As I see it, yes',
'Most likely',
'Outlook good',
'Yes',
'Signs point to yes',
'Reply hazy try again',
'Ask again later',
'Better not tell you now',
'Cannot predict now',
'Concentrate and ask again',
'Don\'t count on it',
'My reply is no',
'My sources say no',
'Outlook not so good',
'Very doubtful'
];


module.exports.specialResponses = [
  {
    name: 'ERROR',
    type: 'error',
    description: ''
  }];

module.exports.handlers = function(app, nextResponse) {
  app.post('/api/:nino/response_generator', function(req, res) {
    console.log('Received headers:');
    console.log(req.headers);
    console.log('Received body:');
    console.log(req.body);

    if (nextResponse() === 'ERROR') {
      return error(res);
    }
    return myResponse(req, res);
  });

  return nextResponse();
};


function error(res) {
  return res.status(500).json({
    "status": "error"
  });
}


function myResponse(req, res) {

  if (req.body.responsetype === '8ball')
    var answer = ballResponses[Math.floor(Math.random()*ballResponses.length)];
    return res.status(200).json({
        answer: answer
    }
  );

  return res.status(400).json({
    "status": "error"
  });
}
