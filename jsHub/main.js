import Search from "./search.js";
import Contact from "./contact.js";
import Category from "./category.js";
import Area from "./area.js";
import Ingredients from "./ingredient.js";
import Meal from "./meal.js";
import Animation from "./animation.js";

/*-- Initialize the app --*/
(async function () {
    const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    new Animation().show();
    try {
        const response = await fetch(URL);
        const data = await response.json();
 
        new Animation().hide();
        const meal = new Meal();
        meal.display_meals(data.meals);
    }
    catch (error) {
        console.log(error);
    }
})();


/*-- Handling showing search section --*/
$('.menu-item#search').click(function () {
    const search = new Search();
    search.show();
});

/*-- Handling showing contact section --*/
$('.menu-item#contact').click(function () {
    const contact = new Contact();

    contact.show();
});

/*-- Handling CopyRight Date --*/
$('#copyRights-date').text(function () {
    return new Date().getFullYear();
});

/*-- Handling toggling the sidebar --*/
$(document).ready(function () {
    const width = $('.menu').innerWidth(); 
    $('.sidebar').animate({ left: -width });
});

$('.open').click(function () {
    $('.sidebar').animate({ left: 0 });
    $('.open').toggleClass('d-none');
    $('.close').toggleClass('d-none');

    for (let index = 0; index < 5; index++){
        $('.menu-item').eq(index).animate({ top: 0 }, 200 * index);
    }
});

function close_sidebar() {
    const width = $('.menu').innerWidth(); 
    $('.sidebar').animate({ left: -width });

    $('.open').toggleClass('d-none');
    $('.close').toggleClass('d-none');

   
    $('.menu-item').animate({ top: 200 });
}

$('.close').click(function () {
    close_sidebar();
});

$('.menu-item').click(close_sidebar);


/*-- Handling displaying categories --*/
$('.menu-item#categories').click(function () {
    const category = new Category();
    category.get_categories();
});

/*-- Handling displaying areas --*/
$('.menu-item#area').click(function () {
    const area = new Area();
    area.get_areas();
});

/*-- Handling displaying ingredients --*/
$('.menu-item#ingredients').click(function () {
    const ingredients = new Ingredients();
    ingredients.get_ingredients();
});