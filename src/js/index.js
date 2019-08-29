// 24e353e277862bbad7a4e6c0ba41fd22
// https://www.food2fork.com/api/search

const axios = require('axios');

async function getRecipe(query){
    const queryUrl = 'https://www.food2fork.com/api/search?';
    const ApiKey = '24e353e277862bbad7a4e6c0ba41fd22';
    
    try {
        const result = await fetch(`${queryUrl}key=${ApiKey}&q=${query}`);
        const recipe = await result.json();
        console.log(recipe);
    } catch(err){
        console.log(err);
    }
}

getRecipe('apple');

async function getRecipeWithAxios(query){
    const queryUrl = 'https://www.food2fork.com/api/search?';
    const ApiKey = '24e353e277862bbad7a4e6c0ba41fd22';
    axios.get(`${queryUrl}key=${ApiKey}&q=${query}`)
        .then(function(recipe){
            console.log(recipe.data);
        })
        .catch(function(err){
            console.log(err);
        })
}

getRecipeWithAxios('banana');