import Search from './models/Search';


/* Global state of the app 
- search object
- current recipe object
- shopping list object
- liked object
*/

const state = {};

const controlSearch = async () => {
    // get the query from the view
    const query = 'pizza';
    if (query) {
        //new search object and add to state
        state.search = new Search(query);

        //search for recipe
        await state.search.getRecipe();

        //prepare UI for result
        

        //render result on UI
        console.log(state.search);

    }
}

document.querySelector('.search').addEventListener('submit', env => {
    env.preventDefault();
    controlSearch();
})



