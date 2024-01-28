import Animation from "./animation.js";
const animation = new Animation();

export default class Details{
    #URL;
    #Call_API= async function () {
        try {
            const response = await fetch(this.#URL);
            const data = await response.json();
            const [details] = data.meals;
            console.log(details);
            return details;
        }
        catch (error) {
           return new Error(error);
        }
    }

    display_details(details) {
        let ingredients = '';
        for (let index = 1; index <= 20; index++){
            let ingredient = 'strIngredient' + index,
                measure = 'strMeasure' + index;
            
            if ((details[measure] != null && details[measure] !='') && details[ingredient] != null && details[ingredient] !='') {
                ingredients +=`<span class="recipe p-2 rounded-3">${details[measure]} ${details[ingredient]}</span>`;
            }
        }

        let tags; 
        if (details.strTags) {
            tags= details.strTags.split(',').map((tag) => {
                return `<span class="tag p-2 rounded-3">${tag}</span>`
            });
        }
       

        $('.content .container').html(
            `
            <div class="details row m-0 text-white justify-content-end ">
            <div class=" col-12  col-lg-4 px-2 animate__animated animate__bounceInLeft">
                 <img src=${details.strMealThumb} alt="meal image" class="w-100 rounded-2">
                 <h2 class="my-2">${details.strMeal}</h2>
            </div>
            <div class="col-12 col-lg-8 px-2 d-flex flex-column gap-2 animate__animated animate__bounceInRight">
               <div class="instructions">
                <h2 class="title">Instruction</h2>
                <p class="text">${details.strInstructions}</p>
               </div>
               <div class="area fs-3"><span class="fw-bold">Area :</span> ${details.strArea}</div>
               <div class="category fs-3"><span class="fw-bold">Category :</span>  ${details.strCategory}</div>
               <div class="recipes">
                <h2>Recipes :</h2>
                <div class="elements d-flex gap-2 flex-wrap">
                   ${ingredients}
                </div>
               </div>

               <div class="tags">
                <h2>Tags :</h2>
                <div class="elements d-flex gap-3 flex-wrap">
                    ${(tags)?tags.join(' '):''}
                </div>
               </div>

               <div class="resources d-flex gap-3 py-2">
                <a href=${details.strSource} target="blank" class="btn btn-warning ">Source</a>
                <a href=${details.strYoutube} target="blank" class="btn btn-danger ">Youtube</a>
               </div>
            </div>
        </div>
            `
        );
            
    }
    
    get_details(mealID) {
        animation.show();

        this.#URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
        this.#Call_API().then((details) => {
            animation.hide();
            this.display_details(details);
        }).catch((error) => {
            console.log(error);
        });
    }
}