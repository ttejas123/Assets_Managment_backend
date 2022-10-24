const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
	name:{
		type:String,
	    required: true
	},
	img:{
		type:String,
	    required: true
	},
	count:{
		type:String,
	    required: true
	},
	category: { 
		type: String 
	},
    subcat: { 
		type: String 
	},
	type: { 
		type: String 
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});


const User = new mongoose.model("bagpack", userDataSchema);
module.exports = User

