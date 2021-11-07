const mongoose = require( 'mongoose' );

const monthlySchema = mongoose.Schema( {
	_id : mongoose.Schema.Types.ObjectId,
	parent : { type : mongoose.Schema.Types.ObjectId, ref : 'bill' },
	amount_due : { type : Number },
	amount_paid : { type : Number },
	exp_date : { type : Date },
	paid_date : { type : Date },
	month_id: {type: Number, required: true},
	status : {
		type : String,
		required : true,
		enum : [ 'WAITING', 'PENDING', 'PAID', 'EXPIRED' ],
		message : 'INVALID ACTION TYPE: {VALUE}'
	},
} );

module.exports = mongoose.model( 'monthly', monthlySchema );
