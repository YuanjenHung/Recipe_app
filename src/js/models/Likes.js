export default class Likes {
    constructor () {
        this.likes = [];
    }

    addLike(recipe){
        const newLike = {
            image: recipe.image, 
            title: recipe.title, 
            author: recipe.author, 
            id: recipe.id
        }
        this.likes.push(newLike);
        return newLike;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getLength(){
        return this.likes.length;
    }
}