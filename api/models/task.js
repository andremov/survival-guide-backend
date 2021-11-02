const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type: String, required: true},
    information : {type: String},
    status : {
        type : String,
        required : true,
        enum : [ 'PENDING', 'DONE' ],
        message : 'INVALID ACTION TYPE: {VALUE}'
    },
});

module.exports = mongoose.model('order', orderSchema);
