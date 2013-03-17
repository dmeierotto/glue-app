
/**
 * Module dependencies.
 */

var express = require('express');
var models = require("./models/questions.js");

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
    title: 'Contact'
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
  
  res.render('result', {    
    title: 'Survey', efficacyScore : efficacyScore, threatScore : threatScore, threatMessage : threatMessage, efficacyMessage : efficacyMessage 
  });
});


//start the http server
app.listen(process.env.PORT || process.env.C9_PORT);


