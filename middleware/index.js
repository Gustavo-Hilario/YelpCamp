var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedin = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	//We have to set the error message before redirect and then we can show this error (in this case, in the index.js from routes)
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/loguin");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//Are someone logged in ?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found");
				res.redirect("/campgrounds");
			} else {
	//Does user own the campground ?
				// equal is a method to avoid problems in comparation - string and object
				if(foundCampground.author.id.equals(req.user._id)){
					return next();
				}	else{
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)){
					return next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
};

module.exports = middlewareObj;