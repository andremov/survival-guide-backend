const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type: String, required: true},
    information : {type: String},
    bill_type : {
        type: String,
        required : true,
        enum : [ 'PHYSICAL', 'VIRTUAL', 'BOTH' ],
        message : 'INVALID ACTION TYPE: {VALUE}'
    },
});

module.exports = mongoose.model('product', productSchema);
