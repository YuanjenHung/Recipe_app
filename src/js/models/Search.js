const axios = require('axios');
import {searchUrl, apiID, apiKey} from '../config';

// food2fork
// 24e353e277862bbad7a4e6c0ba41fd22
// https://www.food2fork.com/api/search

// Edaman
// 461e69e1323de2956705b5a90c1e6c29
// https://api.edamam.com/search

export default class Search{
    constructor(query, page = 1){
        this.query = query;
        this.page = page;
    }

    async getRecipe(){
        console.log('async getRecipe start!')

        const start = (this.page - 1) * 10;
        const end = this.page * 10;
        const requestUrl = `${searchUrl}q=${this.query}&app_id=${apiID}&app_key=${apiKey}&from=${start}&to=${end}`;

        try {
            const res = await axios.get(requestUrl);
            const result = res.data.hits;
            this.result = [];
            this.result = result;
        } catch (err) {
            console.log(err);
        }
        
        console.log('async getRecipe finish.')
    }
}
