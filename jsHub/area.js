import Animation from "./animation.js";
import Meal from "./meal.js";

export default class Area{
    #URL;

    #call_API = async function () {
        try {
            const response = await fetch(this.#URL);
            const data = await response.json();
            return data.meals;
        }
        catch (error) {
            return new Error(error);
        }
    }

    display_areas(areas) {
        let content = '';

        for (const area of areas) {
            content += `
                <div class="col-12 col-md-4 col-lg-3 p-2 animate__animated animate__bounceInUp">
                    <div class="area px-2 py-3 text-white d-flex flex-column align-items-center gap-3" id=${area.strArea}>
                        <i class="fa-regular fa-flag"></i>
                        <h2 class="name">${area.strArea}</h2>
                    </div>
                </div>
            `;
        }

        $('.content .container').html(
            `
            <div class="areas row m-0">
               ${content}
            </div>
            `
        );

        $('.area').click(function (e) {
            const meal = new Meal();

            const MEAL_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${$(e.target).closest('.area').attr('id')}`;
            meal.get_meals(MEAL_URL,false,true);
        });
    }

    get_areas() {
        new Animation().show();
        this.#URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
        this.#call_API().then((areas) => {
            new Animation().hide();
            this.display_areas(areas);
        }).catch((error) => console.log(error));
    }
} 