var express               = require('express'),
	app                   = express(),
	locus                 = require('locus'),
	bodyParser            = require("body-parser"), //library to work with user data from a form with METHOD="POST"
	mongoose              = require("mongoose"),
	flash                 = require("connect-flash"),
	passport              = require("passport"),
	passportLocalMongoose = require("passport-local-mongoose"),
	LocalStrategy         = require("passport-local"),
	methodOverride        = require("method-override"),	
	User                  = require("./models/user.js"),
	Campground            = require("./models/campground"), //Taking SCHEMA and CAMPGROUND MODEL from another file inside models folder
	Comment               = require("./models/comment"), //Taking SCHEMA and COMMENT MODEL from another file inside models folder
	seedDB                = require("./seeds"); //Requiring/Importing the seedDB function

var commentRoutes      = require("./routes/comment");
var campgroundsRoutes  = require("./routes/campground");
var indexRoutes        = require("./routes/index");

// seedDB();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var url = process.env.DATABASE || "mongodb+srv://Gustavo:TYB4sfA368fa8aua@yelpcamp-mzcrz.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(url, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
		console.log("Connected to DB");
	}).catch(err => {
		console.log("Error: ", err.message);
});

//Set app to use passport

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: 'Ray, Luke and Mass',
	resave: false,
	saveUninitialized: false	
}));

app.use(passport.initialize());
app.use(passport.session());

// AUTHENTICATION = passport/ passport-local/ passport-local-mongoose/ express-session/ 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Setup currentUser to any route --- have to place before the passport setting because obviously the user configuration need them
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//ROUTES

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.get("*", function(req, res){
	res.send("This page does not exist. I am really worried by your mental health");
});

app.listen(process.env.PORT || 5000, function(){
	console.log("Serving the page");
});