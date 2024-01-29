import Animation from "./animation.js";
import Meal from "./meal.js";

export default class Ingredients{
    #URL;
    #call_API =  async function () {
        try {
            const response = await fetch(this.#URL);
            const data = await response.json();
            console.log(data.meals);

            return data.meals;
        }
        catch (error) {
            console.log(error);
        }
    }
    
    display_ingredients(ingredients) {
        let content = '';
        console.log(ingredients);
        for (const ingredient of ingredients) {
            content += `
            <div class="col-12 col-md-4 col-lg-3 p-2 animate__animated animate__bounceInUp">
                <div class="ingredient text-white text-center d-flex flex-column gap-2" id=${ingredient.strIngredient}>
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h2 class="name">${ingredient.strIngredient}</h2>
                    <p class="description px-2 w-100">${ingredient.strDescription}</p>
                </div>
            </div>
            `;
        }

        $('.content .container').html(
            `
            <div class="ingredients row m-0">
               ${content}
            </div>
            `
        );

        $('.ingredient').click((e) => {
            console.log($(e.target).closest('.ingredient').attr('id'));

            const MEALS_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${$(e.target).closest('.ingredient').attr('id')}`;
            new Meal().get_meals(MEALS_URL,false,true);
        });
    }

    get_ingredients() {
        this.#URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
        new Animation().show();

        this.#call_API().then((ingredients) => {
            new Animation().hide();
            this.display_ingredients(ingredients.slice(0,20));
        }).catch((error) => console.log(error));
    }
}