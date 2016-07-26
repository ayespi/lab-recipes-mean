var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');

var db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});

db.once('open', function() {
  console.log("Database has been connected!!!");
});

// First, we instantiate a namespace for our Schema constructor defined by mongoose.
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var IngredientSchema = new Schema({
  name: String
});

var RecipeSchema = new Schema({
  name: String,
  ingredients: [IngredientSchema]
});

var Recipe = mongoose.model("Recipe", RecipeSchema);
var Ingredient = mongoose.model("Ingredient", IngredientSchema);

// module.exports = {
//   Recipe: Recipe,
//   Ingredient: Ingredient
// };
//
var butter = new Ingredient({
  name: "Butter"
});

var sugar = new Ingredient({
  name: "Sugar"
});

var eggs = new Ingredient({
  name: "Eggs"
});

var cake = new Recipe({
  name: "Bundt"

});

cake.ingredients.push(butter);
cake.ingredients.push(sugar);
cake.ingredients.push(eggs);

// Then we save it to the database using .save
cake.save(function(err, recipe){
  if(err){
    console.log(err);
  }
  else{
    console.log(recipe);
  }
});
