import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';


/* Global state of the app 
- search object
- current recipe object
- shopping list object
- liked object
*/

const state = {};

/* Search functionality */

const controlSearch = async () => {
    //prepare UI for result
    searchView.clearSearchList();
    renderLoader(elements.searchResult);

    try {
        //search for recipe
        await state.search.getRecipe();

        //render result on UI
        clearLoader();
        searchView.renderSearchList(state.search);

    } catch (err) {
        console.log(err);
    }
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

/* Recipe functionality */

const controlRecipe = async () => {
    const hash = window.location.hash.replace('#','');

    if (hash) {
        //prepare ui
        recipeView.clearRecipeField();
        renderLoader(elements.recipeField);

        //create recipe obj and add to state
        state.recipe = new Recipe(hash);

        try {
            //get recipe data
            await state.recipe.getRecipeByID();

            //calc cooking time, serving and round Ingrediants weight
            state.recipe.calcCookTime();
            state.recipe.calcServing();
            state.recipe.roundIngrediant();

            //render the ui
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            clearLoader();
            console.log(err);
        }
        
    }
}

['hashchange', 'load'].forEach(event => {window.addEventListener(event, controlRecipe)});

elements.recipeField.addEventListener('click', e => {
    if(e.target.matches('.recipe__info-buttons, .recipe__info-buttons *')) {
        if (e.target.matches('.btn-increase, .btn-increase *')) {
            state.recipe.updateServing('inc');
        } else {
            if (state.recipe.serving > 1) state.recipe.updateServing('dec');
        }
        recipeView.updateServing(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }
})

/* List functionality */

const controlList = () => {
    if (!state.list) state.list = new List();

    state.recipe.ingrediants.forEach(el => {
        const count = el.weight != 0 ? el.weight : el.quantity;
        const unit = el.weight != 0 ? 'g' : 'unit';
        const item = state.list.addItem(count, unit, el.food);
        listView.renderItem(item);
    })
}

elements.shopListField.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.id;
    
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //remove the item from state
        state.list.deleteItem(id);

        //delete the item on the interface
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        //update the state
        state.list.updateItem(id,e.target.value);
    }
});

elements.shopListField.addEventListener('change', e => {
    if (e.target.matches('.shopping__count-value')) {
        state.list.updateItem(id,e.target.value);
    }
})

/* Like functionality */

const controlLikes = () => {
    if (!state.likes) state.likes = new Likes();
    if(state.likes.isLiked(state.recipe.id)){
        //remove item from likes state
        state.likes.deleteLike(state.recipe.id);

        //toggle like button

        //remove item from interface

    } else {
        //add item to likes state
        const item = state.likes.addLike(state.recipe);

        //toggle like button

        //add item to interface
    }
    console.log(state.likes);
}
