var  mongoose = require("mongoose"); 

//COMMENT SCHEMA
var commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id:{  //Using user by Referencing his ID from DATABASE
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	date: Date,
});

//COMMENT MODEL
var Comment = mongoose.model("Comment", commentSchema);

//COMENT EXPORTS
module.exports = Comment;