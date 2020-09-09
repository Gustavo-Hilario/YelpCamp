var mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"); //Taking SCHEMA and COMMENT MODEL from another file inside models folder

var data = [
	{
		name: "Natalia's Campground",
		image: "http://s8.favim.com/orig/72/dream-book-books-camping-Favim.com-716100.jpg",
		description: "This is my place where I love to drink my tea and think about my dreams. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet sollicitudin orci. Fusce a arcu ut est volutpat laoreet in ut ligula. Sed sit amet consectetur dolor. Integer ante urna, rhoncus eleifend sem quis, rutrum luctus nunc. Phasellus vitae felis gravida ipsum rutrum molestie. Mauris sit amet felis feugiat, volutpat magna non, consequat velit. Quisque pharetra urna nec egestas efficitur. Integer vestibulum ut felis non tincidunt. Proin vel congue elit. Donec id urna ac ante aliquet tempus nec id tortor. Nam nibh augue, molestie nec consequat mollis, sagittis non ex.",
		author:{
			id: "5ddc6d47233e0d0c5cd035d5",
			username: "Lilica"
		}
	},
	{
		name: "Lilica's Campground",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOedshI4RsvdpYI3cR5i2c3YxEvnPzbjF2xOt_hL50X_NcQvcg&s",
		description: "This is my motorhome, inside it I and my love travel around the world. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet sollicitudin orci. Fusce a arcu ut est volutpat laoreet in ut ligula. Sed sit amet consectetur dolor. Integer ante urna, rhoncus eleifend sem quis, rutrum luctus nunc. Phasellus vitae felis gravida ipsum rutrum molestie. Mauris sit amet felis feugiat, volutpat magna non, consequat velit. Quisque pharetra urna nec egestas efficitur. Integer vestibulum ut felis non tincidunt. Proin vel congue elit. Donec id urna ac ante aliquet tempus nec id tortor. Nam nibh augue, molestie nec consequat mollis, sagittis non ex.",
		author:{
			id: "5ddc6d47233e0d0c5cd035d5",
			username: "Lilica"
		}
	},	
	{
		name: "Llaganuco Campground",
		image: "https://www.huarazturismo.com/gal/tours-laguna-llanganuco1.jpg",
		description: "Here we have the most beautiful lake of the planet. Nullam et pellentesque massa. Vivamus vel ipsum iaculis, suscipit quam sit amet, mollis purus. Sed quis ante lobortis, ultrices erat sed, aliquam massa. Nunc ex enim, vulputate sit amet purus vel, pellentesque tempus risus. Cras sit amet orci nisl. Suspendisse consectetur erat ac mauris lobortis, quis luctus massa fringilla. Aenean auctor est eu posuere lacinia. Donec porta magna in interdum venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed non lacus ut diam ullamcorper mollis quis non massa. Aenean sollicitudin tincidunt imperdiet. Phasellus at sollicitudin nibh. Phasellus dictum ut nunc a viverra.",
		author:{
			id: "5ddc6d47233e0d0c5cd035d5",
			username: "Lilica"
		}
	}	
];

function seedDB(){
	//REMOVE ALL CAMPGROUNDS 	
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} 
		console.log("Removed Campgrounds");
//ADD A FEW CAMPGROUNDS - WE DON'T HAVE GUARANTEE THAT THIS FUNCTION WE RUN AFTER REMOVE, SO WE HAVE TO PUT INSIDE
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("Added the var data inside the campgrounds collection");
					Comment.create({
						text: "I was in this place with Brock and Misty, and also with my Pikachu, Charizard, and others pokemons, we loved it and we want to return. A la carga!",
						author:{
							id: "5ddc6d47233e0d0c5cd035d5",
							username: "Lilica"
						}
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comment");
						}
					});
				}
			});
		});
//ADD A FEW COMMENTS
	});
}

module.exports = seedDB; //exporting the function

