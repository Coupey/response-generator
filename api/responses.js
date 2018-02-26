"use strict";
const ballResponses = [
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

const churchillQuotes = [
  {quote:"Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill"},
  {quote:"Success consists of going from failure to failure without loss of enthusiasm.", author: "Winston Churchill"},
  {quote:"If you're going through hell, keep going.", author: "Winston Churchill"},
  {quote:"Attitude is a little thing that makes a big difference.", author: "Winston Churchill"},
  {quote:"Kites rise highest against the wind - not with it.", author: "Winston Churchill"},
  {quote:"You have enemies? Good. That means you've stood up for something, sometime in your life.", author: "Winston Churchill"},
  {quote:"The best argument against democracy is a five-minute conversation with the average voter.", author: "Winston Churchill"},
  {quote:"The pessimist sees difficulty in every opportunity. The optimist sees the opportunity in every difficulty.", author: "Winston Churchill"},
  {quote:"Perhaps it is better to be irresponsible and right, than to be responsible and wrong.", author: "Winston Churchill"},
  {quote:"It is a good thing for an uneducated man to read books of quotations.", author: "Winston Churchill"},];

const wildeQuotes = [
  {quote:"Experience is simply the name we give our mistakes.", author: "Oscar Wilde"},
  {quote:"True friends stab you in the front.", author: "Oscar Wilde"},
  {quote:"Memory... is the diary that we all carry about with us.", author: "Oscar Wilde"},
  {quote:"This suspense is terrible. I hope it will last.", author: "Oscar Wilde"},
  {quote:"The truth is rarely pure and never simple.", author: "Oscar Wilde"},
  {quote:"We are all in the gutter, but some of us are looking at the stars.", author: "Oscar Wilde"},
  {quote:"Always forgive your enemies - nothing annoys them so much.", author: "Oscar Wilde"},
  {quote:"There are only two tragedies in life: one is not getting what one wants, and the other is getting it.", author: "Oscar Wilde"},
  {quote:"There is only one thing in life worse than being talked about, and that is not being talked about.", author: "Oscar Wilde"},
  {quote:"Experience is one thing you can't get for nothing.", author: "Oscar Wilde"}
];

const twainQuotes = [
  {quote:"The secret of getting ahead is getting started.", author: "Mark Twain"},
  {quote:"Kindness is the language which the deaf can hear and the blind can see.", author: "Mark Twain"},
  {quote:"Whenever you find yourself on the side of the majority, it is time to pause and reflect.", author: "Mark Twain"},
  {quote:"Get your facts first, then you can distort them as you please.", author: "Mark Twain"},
  {quote:"All you need in this life is ignorance and confidence, and then success is sure.", author: "Mark Twain"},
  {quote:"You can't depend on your eyes when your imagination is out of focus.", author: "Mark Twain"},
  {quote:"Go to Heaven for the climate, Hell for the company.", author: "Mark Twain"},
  {quote:"It's not the size of the dog in the fight, it's the size of the fight in the dog.", author: "Mark Twain"},
  {quote:"Giving up smoking is the easiest thing in the world. I know because I've done it thousands of times.", author: "Mark Twain"},
  {quote:"Good friends, good books and a sleepy conscience: this is the ideal life.", author: "Mark Twain"}
];

const lyrics = [
  {lyric:"Emancipate yourselves from mental slavery. None but ourselves can free our minds.", artist: "Bob Marley"},
  {lyric:"Don't criticize what you can't understand.", artist: "Bob Dylan"},
  {lyric:"You're an expert at sorry and keeping the lines blurry", artist: "Taylor Swift"},
  {lyric:"We all shine on...like the moon and the stars and the sun...we all shine on...come on and on and on..", artist: "John Lennon\n"},
  {lyric:"Excuse me while I kiss the sky.", artist: "Jimi Hendrix"},
  {lyric:"You don't know, oh, oh. You don't know you're beautiful.", artist: "One Direction"},
  {lyric:"Don't it always seem to go, that you don't know what you've got till it's gone.", artist: "Joni Mitchell"},
  {lyric:"There must be some kind of way out of here,' said the joker to the thief...", artist: "Bob Dylan"},
  {lyric:"Let me fall out of the window, With confetti in my hair", artist: "Tom Waits"},
  {lyric:"I wanna be the girl with the most cake.", artist: "Courtney Love"}
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

    console.log("Nino is: " + req.params.nino);

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

  if (!req.body.responsetype || !req.body.name || !req.body.dob) {
    return res.status(400).json({
      "errorType": "Required fields (responsetype, name, dob) not present"
    });
  }

  if (req.body.responsetype === '8ball') {
    var answer = ballResponses[Math.floor(Math.random() * ballResponses.length)];
    return res.status(200).json({
        answer: answer
      }
    );
  }

  if (req.body.responsetype === 'quote') {
    let quotes = '';

    switch (req.body.quoter) {
      case 'churchill':
        quotes = churchillQuotes;
        break;
      case 'wilde':
         quotes = wildeQuotes;
        break;
      case 'twain':
         quotes = twainQuotes;
        break;
      default:
         quotes = churchillQuotes.concat(wildeQuotes, twainQuotes);
    }

    const quote = quotes[Math.floor(Math.random()*quotes.length)];
    return res.status(200).json({
        quote: quote.quote,
        author: quote.author
      });
  }

  if (req.body.responsetype === 'lyric') {
    var resp = lyrics[Math.floor(Math.random() * lyrics.length)];
    return res.status(200).json(resp);
  }


  return res.status(400).json({
    "status": "error"
  });
}
