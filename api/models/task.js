const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : { type : String, required : true },
  information : { type : String },
  due_data : { type : Date },
  done_date : { type : Date },
  status : {
    type : String,
    required : true,
    enum : [ 'PENDING', 'DONE', 'OVERDUE' ],
    message : 'INVALID ACTION TYPE: {VALUE}'
  },
});

module.exports = mongoose.model('order', orderSchema);
