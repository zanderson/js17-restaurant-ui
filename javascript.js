// PART 1

// FOODITEM

var FoodItem = function(name, calories, vegan, glutenFree, citrusFree ){
	this.name = name,
	this.calories = calories,
	this.vegan = vegan,
	this.glutenFree = glutenFree,
	this.citrusFree = citrusFree
};

var Gulyas = new FoodItem (
	'Gulyas Soup',
	500,
	true,
	true,
	true
	);

var Tiramisu = new FoodItem (
	'Tiramisu Yum',
	1500,
	true,
	false,
	true
	);


FoodItem.prototype.stringify = function (){
	return 'Our delicious ' + this.name + ' has only ' + this.calories + '. Diatery information: gluten free: ' + this.glutenFree + ', citrus free: ' + this.citrusFree + ', vegan: ' + this.vegan + '.'
};

var Sermale = new FoodItem (
	'Sermale Cabbage Rolls',
	1000,
	false,
	true,
	false
	);

var Hamburger = new FoodItem (
	'Cheeseburger',
	1200,
	false,
	false,
	true
	);

// PART 2

// FOOD ITEMS

var vodka = new FoodItem (
	"Milagros Vodka",
	100,
	true,
	true,
	true
	)
var tomatoJuice = new FoodItem (
	"Tomato Juice",
	50,
	true,
	true,
	true
	)
var celery = new FoodItem (
	"Celery Stick",
	10,
	true,
	true,
	true
	)

//DRINKS

var Drink = function(name, description, price, ingredients){
	this.name 	= name,
	this.description	= description,
	this.price			= price,
	this.ingredients	= ingredients
}

Drink.prototype.stringify = function(){
	return "Try our " + this.name + ". " + this.description
}

var blodyMarry = new Drink(
	"Blody Marry",
	"An amazingly delicious coctail!",
	7,
	[vodka, tomatoJuice, celery]
	)

// PLATES

var Plate = function(name, description, price, ingredients, citrusSwitch, glutenFreeSwitch, veganSwitch){
	this.name 	= name,
	this.description	= description,
	this.price			= price,
	this.ingredients	= ingredients,
	this.citrusSwitch	= citrusSwitch,
	this.glutenFreeSwitch	= glutenFreeSwitch,
	this.veganSwitch	= veganSwitch
}

Plate.prototype.stringify = function(){
	return this.name + ". " + this.description
}

var euroPlate = new Plate("Euro Plate", "A delicious blend of European classics.", 100, [Gulyas, Tiramisu], false, false, false)
var romanianPlate = new Plate("Romanian Plate", "A delicious blend of European classics.", 100, [Gulyas, Sermale], false, false, false)

// ORDER

var Order = function(platesArray) {
	this.plates = platesArray
}

Order.prototype.stringify = function(){
	var plates = []
	this.plates.map( function(plateItem) {
		plates.push(plateItem.name)
	})
	return plates.join(", ")
}

var zoeOrder = new Order([euroPlate, romanianPlate])

// MENU 

var Menu = function(platesArray) {
	this.plates = platesArray
}

var tuesdayMenu = new Menu([euroPlate, romanianPlate]);

Menu.prototype.stringify = function(){
	var plateNames = []
	var plateDescriptions = []
	var platePrices = []
	var menuArray = []
	this.plates.map( function(plateItem){
		plateNames.push(plateItem.name)
		plateDescriptions.push(plateItem.description)
		platePrices.push(plateItem.price)
	})
	for(var i=0; i<plateNames.length; i++){
		menuArray.push(plateNames[i] + ', ' + plateDescriptions[i] + ', $' + platePrices[i]);
	}
	return menuArray.join("\n")
}

// RESTAURANT

var Restaurant = function(name, description, menu) {
	this.name		= name,
	this.description = description,
	this.menu 	= menu
}

Restaurant.prototype.stringify = function(){
	return this.name + "\n" + this.description + "\n" + this.menu 
}

var zoesRestaurant = new Restaurant('Little Hungary', 'Traditional Homemade Food', tuesdayMenu.stringify());

// CUSTOMER

var Customer = function(dietaryPreferences) {
	this.dietaryPreferences = dietaryPreferences
}

Customer.prototype.stringify = function(){
		return "Customer is gluten free : " + this.dietaryPreferences.glutenFree + ", citrusFree :" + this.dietaryPreferences.citrusFree + ", vegan:" + this.dietaryPreferences.vegan;
}

var valentin = new Customer({glutenFree : false, citrusFree : false, vegan : false})

// PART 3

Plate.prototype.isVegan = function(){
	var result = true
	this.ingredients.forEach( function(foodItem){
		if (foodItem.vegan === false){
			result = false
		}
	})
	return result
}

Plate.prototype.isGlutenFree = function(){
	var result = true
	this.ingredients.forEach( function(foodItem){
		if (foodItem.glutenFree === false){
			result = false
		}
	})
	return result
}

Plate.prototype.isCitrusFree = function(){
	var result = true
	this.ingredients.forEach( function(foodItem){
		if (foodItem.citrusFree === false){
			result = false
		}
	})
	return result
}


//JS17
angular.module('restaurantApp', []);
	
	angular.module('restaurantApp')
		.controller('server', ['$scope', function($scope){

			$scope.restaurant = zoesRestaurant
			$scope.customer = valentin
			$scope.plates = [euroPlate, romanianPlate]

			$scope.checkItCitrus = function() {
				if ($scope.customer.dietaryPreferences.citrusFree) {
					$scope.plates.forEach(function(plate){
						var ingredientsClear = true
						plate.ingredients.forEach(function(ingredient){
							if (!ingredient.citrusFree) {
								ingredientsClear = false
							}
						})
						if (ingredientsClear) {
						plate.citrusSwitch = true
						}
					})
				} else {
					$scope.plates.forEach(function(plate){
						plate.citrusSwitch = false
					})
				}
			}
			$scope.checkItVegan = function() {
				if ($scope.customer.dietaryPreferences.vegan) {
					$scope.plates.forEach(function(plate){
						var ingredientsClear = true
						plate.ingredients.forEach(function(ingredient){
							if (!ingredient.vegan) {
								ingredientsClear = false
							}
						})
						if (ingredientsClear) {
						plate.veganSwitch = true
						}
					})
				} else {
					$scope.plates.forEach(function(plate){
						plate.veganSwitch = false
					})
				}
			}
			$scope.checkItGluten = function() {
				if ($scope.customer.dietaryPreferences.glutenFree) {
					$scope.plates.forEach(function(plate){
						var ingredientsClear = true
						plate.ingredients.forEach(function(ingredient){

							if (!ingredient.glutenFree) {
								ingredientsClear = false
							}
						})
						if (ingredientsClear) {
						plate.glutenFreeSwitch = true
						}
					})
				} else {
					$scope.plates.forEach(function(plate){
						plate.glutenFreeSwitch = false
					})
				}
			}

			$scope.addToOrder = function(plate){
				
			}

		}])

	