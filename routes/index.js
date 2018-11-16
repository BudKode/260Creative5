var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

/* GET tasks from database */
router.get('/tasks', function(req, res, next) {
console.log("In the GET route?");
Task.find(function(err,taskList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(taskList); //Otherwise console log the tasks you found
    res.json(taskList); //Then send the tasks
  }
})
});

/* GET immediate schedule from database */
router.get('/schedule', function(req, res, next) {
console.log("In the SCHEDULE route?");
var start = new Date().setHours(0,0,0,0);
var end = new Date();
end = end.setDate(end.getDate() + 5);
var yesterday = new Date();
yesterday = yesterday.setDate(yesterday.getDate() - 3);
console.log("made it here");
Task.find({"Date": {"$gte": yesterday, "$lt": end}}, function(err,taskList) {
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(taskList); //Otherwise console log the comments you found
    res.json(taskList); //Then send the comments
  }
});
});

router.post('/task', function(req, res, next) {
    console.log("POST task route"); //[1]
    console.log(req.body); //[2]
    var newtask = new Task(req.body); //[3]
    console.log(newtask); //[3]
    newtask.save(function(err, post) { //[4]
      if (err) return console.error(err);
      console.log(post);
      res.sendStatus(200);
    });
});

router.param('task', function(req, res, next, id) {
  var query = Task.findById(id);
  query.exec(function (err, task){
    if (err) { return next(err); }
    if (!task) { return next(new Error("can't find task")); }
    req.task = task;
    return next();
  });
});

router.put('/tasks/:task/toggle', function(req, res, next) {
  console.log("in Toggle");
  req.task.toggle(function(err, task){
    if (err) { return next(err); }
    res.json(task);
  });
});

router.delete('/tasks/:task', function(req, res) {
  console.log("in Delete");
  req.task.remove();
  res.sendStatus(200);
});

module.exports = router;