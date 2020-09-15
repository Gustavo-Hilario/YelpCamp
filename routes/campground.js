var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//the principal middleware is named index.js but this is a special name to a file that calls another files, so we don't need write this below
var middleware = require("../middleware");

// =================================================================
// CAMPGROUND PAGE
// =================================================================
router.get("/", middleware.isLoggedin, function(req, res){
	//Get all Campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index" , {campgrounds: allCampgrounds, currentUser: req.user, 
				styles: ["/stylesheets/campground/index.css"], 
				scripts: { header: ["JqueryUI"] , footer: ["/js/campground/index.js"] }
			});
		}
	});
});

// =================================================================
// ADD NEW CAMPGROUND
// =================================================================
router.get("/new", middleware.isLoggedin, function(req, res){
// 	/campground/new is a RESTful convention
	res.render("campgrounds/new", {styles: ["/stylesheets/campground/new.css"], 
		scripts: { header: [] , footer: ["/js/campground/new.js"] }
	});
});

// =================================================================
// POST NEW CAMPGROUND
// =================================================================
router.post("/", middleware.isLoggedin, function(req, res){
// /campground is a RESTful convention to POST on the campground (Get)
	var name = req.body.name;
	var price = req.body.price;
	var imageURL = req.body.imageURL;
	var description = req.body.description;	
	var author = {
			id: req.user._id,
			username: req.user.username
		}
	var newCampground = {name: name, price: price, image: imageURL, description: description, author: author};
		
	Campground.create(newCampground, function(err, createdCampground){
		if(err){
			console.log("Error when trying to create a new Campground");
			console.log(err);
		} else {
			console.log("CREATED CAMPGROUND...");
			console.log(createdCampground);
			res.redirect("/campgrounds"); //to redirect we need the /somePage
		}
	});
});

// =================================================================
//SHOW CAMPGROUND - more info about a specific campground
// =================================================================
router.get("/:id", function(req, res){
	//find the campground with the provided ID
	var campground_ID = req.params.id;
	//TO SEE ALL COMMENTS INSIDE THE CAMPGROUND
	Campground.findById(campground_ID).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			//Render show template with that campground
			res.render("campgrounds/show", { campground: foundCampground, 
				styles: ["/stylesheets/campground/show.css"],
				scripts: { header: ["JqueryUI"] , footer: ["/js/campground/show.js"] } 
			});
		}
	});
});

// =================================================================
// EDIT CAMPGROUND ROUTE
// =================================================================
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id , function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground , 
				styles: [], 
				scripts: { header: [] , footer: [] }
		});
	});
});

// =================================================================
// UPDATE CAMPGROUND ROUTE
// =================================================================
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update the campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground , function(err, UpdatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
	// redirect to the show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


// =================================================================
// DELETE CAMPGROUNDS ROUTE
// =================================================================
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err, deletedCampground){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;