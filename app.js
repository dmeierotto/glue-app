
/**
 * Module dependencies.
 */

var express = require('express');
var models = require("./models/questions.js");
var request = require('request');

var _ = require("underscore");
    
var app = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false }); 
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

app.get('/adherence', function(req, res){
  res.render('adherence', {
    title: 'About Adherence'
  });
});


app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact', sent: false
  });
});

app.post('/contact', function(req, res){
    
    var API_KEY = "key-3gfkfsa60ooc38kuogkty1eq432pj7z4";
            
    var Mailgun = require('mailgun').Mailgun;

    var mg = new Mailgun(API_KEY);
    
    mg.sendText(req.body.email, ['dan.meierotto@gmail.com'],
      'Info request from glue',
      "Practice/name: " + req.body.name + "; Message: " + req.body.name,
      'req.body.email', {},
      function(err) {
        if (err) console.log('Oh noes: ' + err);
        else     console.log('Railgun mail sent success');
    });
        
    res.render('contact', {    
        title: 'Contact', sent : true
    });    
});


app.get('/survey', function(req, res){
  res.render('survey', {
    title: 'Survey', questions: models.questions
  });
});

app.post('/survey', function(req, res){
    
  var efficacyScore = 0;
  var threatScore = 0;
  var threatMessage = "You do not believe there is any threat to your health";
  var efficacyMessage = "You do not believe that you will be able to carry out the RP";
  
  _.each(req.body, function(item){
    var qNum = item.split(",")[0];
    var qVal = parseInt(item.split(",")[1]);
    
    var question = _.select(models.questions, function(q){ return q.Number == qNum; })[0];
    
    if (question.Dimension == models.dimension.TreatmentEfficacy || question.Dimension == models.dimension.PersonalEfficacy){
        efficacyScore += qVal;
    }
    
    if (question.Dimension == models.dimension.Severity || question.Dimension == models.dimension.Vulnerability){
        threatScore += qVal;
    }    
    
    if (threatScore > 40)
        threatMessage = "You fully believe the danger posed by your health issue";
    else if (threatScore > 25)
        threatMessage = "It appears that you believe there is a threat, but that it is not great. You should speak with your doctor to fully understand the consequences";
    
    if (efficacyScore > 40)
        efficacyMessage = "You fully believe that you wil be able to carry out the RP";
    else if (efficacyScore > 25)
        efficacyMessage = "It appears that you believe that you might be able to carry out the RP. You should speak with your doctor to find out ways to motivate you or to make the RP easier for you.";
   
  });  
  
  var client;
  if (process.env.REDISTOGO_URL) {
   // inside if statement
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    client = require("redis").createClient(rtg.port, rtg.hostname);

    client.auth(rtg.auth.split(":")[1]); 
  } 
  else 
  {
     client = require("redis").createClient();
  }
      
  client.on("error", function (err) {
        console.log("Error " + err);
  });
  
  var resultsObj = { efficacyScore : efficacyScore, threatScore : threatScore, threatMessage : threatMessage, efficacyMessage : efficacyMessage };
  
  client.hset("glue-results", "result-" + Date.now(), resultsObj, redis.print);
  
  res.render('result', {    
    title: 'Survey', efficacyScore : efficacyScore, threatScore : threatScore, threatMessage : threatMessage, efficacyMessage : efficacyMessage 
  });
});


//start the http server
app.listen(process.env.PORT || process.env.C9_PORT);


