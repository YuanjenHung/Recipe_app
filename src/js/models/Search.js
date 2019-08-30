const axios = require('axios');

// food2fork
// 24e353e277862bbad7a4e6c0ba41fd22
// https://www.food2fork.com/api/search

// Edaman
// 461e69e1323de2956705b5a90c1e6c29
// https://api.edamam.com/search

const isFood2fork = false;


export default class Search{
    constructor(query){
        this.query = query;
    }

    async getRecipe(){
        const that  = this;
        const searchUrl = 'https://api.edamam.com/search?';
        const apiKey = '461e69e1323de2956705b5a90c1e6c29';
        const apiID = 'c95090c8';
        const requestUrl = `${searchUrl}q=${this.query}&app_id=${apiID}&app_key=${apiKey}`;

        axios.get(requestUrl)
        .then(function(res){
            //console.log(res.data.hits);
            const result = res.data.hits;
            that.result = result;
        })
        .catch(function(err){
            console.log(err);
        });
    }
}
