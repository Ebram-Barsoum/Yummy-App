import Meal from "./meal.js"
import Animation from "./animation.js";

export default class Category{
    #section;
    #URL;

    constructor() {
        this.#section = $('.content .container');
    }

    #call_API = async function () {
        try {
            const response = await fetch(this.#URL);
            const data = await response.json();

            return data.categories;
        }
        catch (error) {
            return new Error(error);
        }
    }

    display_categories(categories) {
        let content = '';
        for (const category of categories) {
            content += `
                <div class="col-12 col-md-6 col-lg-3 p-3">
                    <div class="category position-relative overflow-hidden text-center" id=${category.strCategory}>
                        <img src=${category.strCategoryThumb} alt=${category.strCategory} class="w-100 rounded-3">

                        <div class="overlay position-absolute h-100 rounded-3 p-1 d-flex flex-column justify-content-center gap-2 overflow-hidden ">
                            <h2 class="name">${category.strCategory}</h2>
                            <p class="description">${category.strCategoryDescription}</p>
                        </div>
                   
                    </div>
                </div>
            `;
        }

        $('.content .container').html(
            `<div class="categories row m-0 g-2">${content}</div>
        `);
        
        $('.category').click((e) => {
            const id = $(e.target).closest('.category').attr('id');
            this.#URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;

            new Meal().get_meals(this.#URL);
        });
        
    }

    get_categories() {
        new Animation().show();

        this.#URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        this.#call_API().then((categories) => {
            new Animation().hide();

            this.display_categories(categories);
        }).catch((error) => {
            console.log(error);
        });
    }
}