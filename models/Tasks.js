var mongoose = require('mongoose');
var TaskSchema = mongoose.Schema({ //Defines the Schema for this database
Task: String,
Date: Date,
Complete: Boolean
});
TaskSchema.methods.toggle = function(cb) {
  console.log("in Toggle Schema");
  if(this.Complete){
    this.Complete = false;
  } else {
    this.Complete = true;
  }
  this.save(cb);
};
var Task = mongoose.model('Task', TaskSchema); //Makes an object from that schema as a model