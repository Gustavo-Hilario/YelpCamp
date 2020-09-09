var express = require("express");
// mergeParams to find campground´s ID
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
//the principal middleware is named index.js but this is a special name to a file that calls another files, so we don't need write this below
var middleware = require("../middleware");

// =================================================================
// COMMENTS ROUTES
// =================================================================


// =================================================================
// NEW COMMENT
// =================================================================
router.get("/new", middleware.isLoggedin, function(req, res){
	//find the campground with the provided ID
	var campground_ID = req.params.id;
	// //TO SEE ALL COMMENTS INSIDE THE CAMPGROUND
	Campground.findById(campground_ID, function(err, campground){
		if(err){
			req.flash("error", "Campground not found");
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground , 
				styles: [], 
				scripts: { header: [] , footer: [] }
			});
		}
	});
});

router.post("/", function(req, res){
	// console.log(req.params);
	// console.log(req.body.comment);
	var newComment = req.body.comment;
	//finding campground to put comments inside
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			req.flash("error", "Campground not found");
			res.redirect("/campgrounds");
		} else {
			//creating the comment to the comments DB
			Comment.create(newComment, function(err, comment){
				if(err){
					req.flash("error", "Something went wrong");
					res.redirect("/campgrounds");
				} else {
					//Add username and ID to comment
					comment.author.username = req.user.username;
					comment.author.id = req.user._id;
					//Save changes
					comment.save();
					//Pushing the new Comment inside the Campground
					campground.comments.push(comment);
					//Saving changes on campground
					campground.save();
					req.flash("success", "Successfully added comment");
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

// =================================================================
// EDIT COMMENT ROUTE
// =================================================================

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			req.flash("error", "Comment not found");
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment, 
				styles: [], 
				scripts: { header: [] , footer: [] }
			});	
		}
	});
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	// checkCommentOwnership have to be here because someone using app like postman would do this put request
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, UpdatedComment){
		if(err){
			req.flash("error", "Comment not found and updated");
			console.log(err);
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// =================================================================
// DELETE COMMENT ROUTE
// =================================================================
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error", "Error when deleting");
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("back");
		}
	});
});

module.exports = router;