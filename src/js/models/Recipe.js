const axios = require('axios');
import {searchUrl, apiID, apiKey, prefix} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipeByID(){
        const totalID = prefix + this.id;
        const requestUrl = `http://cors-anywhere.herokuapp.com/${searchUrl}app_id=${apiID}&app_key=${apiKey}&r=${totalID}`;

        try {
            const res = await axios.get(requestUrl);
            const recipe = res.data[0];

            this.image = recipe.image;
            this.title= recipe.label;
            this.author = recipe.source;
            this.ingrediants = recipe.ingredients;
            this.url = recipe.url;

        } catch (err) {
            console.log(err);
        }
    }
}