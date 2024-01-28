import Animation from './animation.js'
import Details from './details.js';

export default class Meal{
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
    
    display_meals(meals,isSearchResult) {

        let content = '';
        for (let meal of meals) {
            content += `
            <div class="meal col-12 col-md-6 col-lg-4 col-xl-3 p-2 animate__animated animate__bounceInUp" id=${meal.idMeal}>
                <div class ="position-relative overflow-hidden  rounded-4">
                    <img src=${meal.strMealThumb} alt="meal image" class="w-100">
    
                    <div class="overlay position-absolute w-100 h-100 d-flex justify-content-center align-items-center ">
                    <h3> ${meal.strMeal}</h3>
                    </div>
                </div>
            </div>
            `;
        }
        
        if (isSearchResult) {
            $('#search-results').html(content);
        }
        else {
            $('.content .container').html(
                `
                <div class="meals row m-0 ">${content}</div>
                `
            );
       }
       
    
        $('.meal').click(function () {
            new Details().get_details(this.id);
        });
    }

    get_meals(URL,isSearchQuery) {
        this.#URL = URL;
        new Animation().show();

        this.#call_API().then((meals) => {
            new Animation().hide();
            this.display_meals(meals,isSearchQuery);
        });
    }
}