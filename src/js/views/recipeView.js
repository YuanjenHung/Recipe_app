const Fraction = require('fractional').Fraction;
import { elements } from './base';

const renderIngrediants = ingrediants => {
    const ingrediantField = document.querySelector('.recipe__ingredient-list');
    ingrediants.forEach(ingrediant => {
        let fractionWeight = new Fraction(ingrediant.weight).toString();
        const template = `
            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${fractionWeight == 0 ? ingrediant.quantity : fractionWeight}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${ingrediant.weight == 0 ? '' : 'g'}</span>
                    ${ingrediant.food}
                </div>
            </li>
        `;
        ingrediantField.insertAdjacentHTML("beforeend", template);
    });
}

const clearIngrediantField = () => {
    const ingrediantField = document.querySelector('.recipe__ingredient-list');
    ingrediantField.innerHTML = '';

}

export const updateServing = (recipe) => {
    const servingField = document.querySelector('.recipe__info-data--people');
    servingField.textContent = recipe.serving;
    clearIngrediantField();
    renderIngrediants(recipe.ingrediants);
}

export const clearRecipeField = () => {
    elements.recipeField.innerHTML = '';
}

export const renderRecipe = recipe => {
    const recipeMarkup = `
        <figure class="recipe__fig">
            <img src="${recipe.image}" alt="${recipe.title} " class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.serving}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list"></ul>
            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </a>
        </div>
    `;
    elements.recipeField.insertAdjacentHTML("beforeend", recipeMarkup);
    renderIngrediants(recipe.ingrediants);
}