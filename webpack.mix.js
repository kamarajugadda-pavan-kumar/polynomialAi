// -------------------------------------------
// this file compiles the js, scss files in resources folder and dumps the result in public/css/app.css and public/js/app.js
// Laravel mix is used for for this
// -------------------------------------------

let mix = require("laravel-mix");

mix
  .js("resources/js/app.js", "public/js/app.js")
  .sass("resources/scss/app.scss", "public/css/app.css");
