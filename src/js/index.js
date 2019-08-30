import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';


/* Global state of the app 
- search object
- current recipe object
- shopping list object
- liked object
*/

const state = {};

const controlSearch = async () => {
    // get the query from the view
    const query = searchView.getInput();
    if (query) {
        //new search object and add to state
        state.search = new Search(query);

        //prepare UI for result
        searchView.clearSearchList();
        searchView.clearInputField();
        renderLoader(elements.searchResult);

        state.search.page = 2;

        //search for recipe
        await state.search.getRecipe();

        //render result on UI
        clearLoader();
        searchView.renderSearchList(state.search)
    }
}

elements.searchForm.addEventListener('submit', env => {
    env.preventDefault();
    controlSearch();
})



