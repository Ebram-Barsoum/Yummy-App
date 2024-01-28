import Meal from "./meal.js";

export default class Search{
    #section;
    constructor() {
        this.#section = $('.content .container');
    }

    show() {
        $(this.#section).html(`
          <div class="search-inputs row m-0 d-flex justify-content-between">
                <div class="col-12 col-md-6">
                  <input type="text" class="form-control" placeholder="Search By Name" id="search-by-name">
                </div>
                <div class="col-12 col-md-6">
                  <input type="text" class="form-control" placeholder = "Search By First Letter" id="search-by-letter" maxlength="1" size="1">
                </div>
          </div>

          <div class="meals row m-0 py-5" id="search-results"></div>
        `);

      let searchInputByName = document.getElementById('search-by-name');
      searchInputByName.onkeyup = () => {
        const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputByName.value}`;
        new Meal().get_meals(URL,true);
      }

      let searchInputByLetter = document.getElementById('search-by-letter');
      searchInputByLetter.oninput = () => {
        const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputByLetter.value}`;
        new Meal().get_meals(URL,true);
      }
     
    }
}