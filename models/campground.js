var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	author: 
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			username: String
		},
	comments: [
		{  //Using comments by Referencing
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
   	]
});

var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;