var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useMongoClient: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
Name: String,
Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
console.log("In the GET route?");
Comment.find(function(err,commentList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(commentList); //Otherwise console log the comments you found
    res.json(commentList); //Then send the comments
    
  }
})
});

/* GET user comments from database */
router.post('/user', function(req, res, next) {
console.log("In the USER route?");
console.log(req.body);
Comment.find(req.body, function(err,commentList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(commentList); //Otherwise console log the comments you found
    res.json(commentList); //Then send the comments
    
  }
})
});

router.post('/comment', function(req, res, next) {
    console.log("POST comment route"); //[1]
    console.log(req.body); //[2]
    var newcomment = new Comment(req.body); //[3]
    console.log(newcomment); //[3]
    newcomment.save(function(err, post) { //[4]
      if (err) return console.error(err);
      console.log(post);
      res.sendStatus(200);
    });
});

/* REMOVE comments from database */
router.post('/delete', function(req, res, next) {
console.log("In the REMOVE route?");
Comment.deleteMany({}, function(err,result) {
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(result); //Otherwise console log the comments you found
    res.sendStatus(200);
  }
})
})

module.exports = router;