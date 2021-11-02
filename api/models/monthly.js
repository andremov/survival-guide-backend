const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    parent : { type: mongoose.Schema.Types.ObjectId, ref: 'bill' },
    value : { type: Number },
    exp_data : { type: Date },
    paid_date : { type: Date },
    status : {
        type: String,
        required : true,
        enum : [ 'WAITING', 'PENDING', 'PAID', 'EXPIRED' ],
        message : 'INVALID ACTION TYPE: {VALUE}'
    },
});

module.exports = mongoose.model('product', productSchema);
