const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : { type : String, required : true },
  information : { type : String },
  due_date : { type : Date },
  done_date : { type : Date },
  status : {
    type : String,
    required : true,
    enum : [ 'PENDING', 'DONE', 'OVERDUE' ],
    message : 'INVALID ACTION TYPE: {VALUE}'
  },
});

module.exports = mongoose.model('task', taskSchema);
