var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Campground = require("../models/campground.js")

router.get("/", function(req, res){
	res.render("landing", {
		styles: [], 
		scripts: { header: [] , footer: [] }});
});

router.get("/home", function (req, res) {
	//Get all Campgrounds from DB
	Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("home", { campgrounds: allCampgrounds, currentUser: req.user,
				styles: ["/stylesheets/home.css"],
				scripts: { header: ["JqueryUI"], footer: ["/js/home.js"] }
			});
		}
	});
});

// =================================================================
// AUTHENTICATION ROUTES
// =================================================================

// PROFILE PAGE
router.get("/secret", middleware.isLoggedin, function(req, res){
	user = {Username: req.user.username, id: req.user._id};
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("user/secret", { campgrounds: allcampgrounds,
			styles: ["/stylesheets/user/secret.css"], 
			scripts: { header: ["JqueryUI"] , footer: ["/js/user/secret.js"] }
			});
		}
	});
});

// USER REGISTRATION
router.get("/register", function(req, res){
	res.render("user/register", {
		styles: [], 
		scripts: { header: [] , footer: [] }
	});
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	var password = req.body.password;
	User.register(newUser, password, function(err, user){
		if(err){
			req.flash("error", err.message);
			res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");	
			});
	});	
});

// LOGUIN LOGIC
router.get("/loguin", function(req, res){
	res.render("user/loguin", {
		styles: ["/stylesheets/loguin.css"], 
		scripts: { header: [] , footer: [] }
	});
});

//LOGUIN USING A MILDWARE + USE A NEW STRATEGY FROM PASSPORT-LOCAL AND AUTHENTICATE USER
router.post("/loguin", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/loguin"
	}), function(req, res){
});

// LOGOUT LOGIC
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/home");
});

module.exports = router;