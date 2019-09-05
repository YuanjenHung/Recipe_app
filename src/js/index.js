import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';


/* Global state of the app 
- search object
- current recipe object
- shopping list object
- liked object
*/

const state = {};

/* Recipe functionality */

const controlRecipe = async () => {
    const hash = window.location.hash.replace('#','');

    if (hash) {
        //prepare ui
        recipeView.clearRecipeField();
        renderLoader(elements.recipeField);

        //create recipe obj and add to state
        state.recipe = new Recipe(hash);

        //get recipe data
        await state.recipe.getRecipeByID();

        //calc cooking time
        state.recipe.calcCookTime();

        //render the ui
        clearLoader();
        console.log(state.recipe);
    }
}

window.addEventListener('hashchange', controlRecipe);

/* Search functionality */

const controlSearch = async () => {
    //prepare UI for result
    searchView.clearSearchList();
    renderLoader(elements.searchResult);

    //search for recipe
    await state.search.getRecipe();

    //render result on UI
    clearLoader();
    searchView.renderSearchList(state.search);
}

elements.searchForm.addEventListener('submit', env => {
    env.preventDefault();

    // get the query from the view
    const query = searchView.getInput();

    //chech the field
    if(query){
        //new search object and add to state
        state.search = new Search(query);

        //clear the searching field
        searchView.clearInputField();

        //render
        controlSearch();
    }
});

elements.buttonField.addEventListener('click', env => {
    //figure out the page users want to go to
    const page = env.target.closest('.btn-inline').dataset.page;

    //update state
    state.search.page = page;

    //render
    controlSearch();
});




