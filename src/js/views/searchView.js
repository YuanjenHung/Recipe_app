import { elements } from './base';

const renderListItem = (el) => {
    const template = `
        <li>
            <a class="results__link" href="${el.recipe.uri}">
                <figure class="results__fig">
                    <img src="${el.recipe.image}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitSentence(el.recipe.label)}</h4>
                    <p class="results__author">${el.recipe.source}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchList.insertAdjacentHTML("beforeend", template);
}

const limitSentence = (sentence, limit = 17) => {
    const newArr = [];
    if(sentence.length > limit){
        const str = sentence.split(' ');
        str.reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                newArr.push(cur);
            } 
            return acc + cur.length;
        }, 0)
        return `${newArr.join(' ')} ...`;
    }
    return sentence;
}

const createButtonTemp = (page, type) => `
    <button class="btn-inline results__btn--${type === 'prev' ? 'prev' : 'next'}">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;


const renderButton = (page, result) => {
    const prevBtn = createButtonTemp(page, 'prev');
    const nextBtn = createButtonTemp(page, 'next');
   
    console.log(page, result, result.length);

    //clean the button field
    elements.buttonField.innerHTML = '';

    if (page === 1 && result.length === 10){
        //display next page button
        elements.buttonField.insertAdjacentHTML('beforeend', nextBtn);
    } else if (page > 1 && result.length === 10){
        //display both button
        elements.buttonField.insertAdjacentHTML('beforeend', prevBtn);
        elements.buttonField.insertAdjacentHTML('beforeend', nextBtn);
    } else if (page > 1 && result.length < 10){
        //display previous button
        elements.buttonField.insertAdjacentHTML('beforeend', prevBtn);
    }
}

export const getInput = () => elements.searchInput.value;

export const renderSearchList = search => {
    search.result.forEach(renderListItem);
    renderButton(search.page, search.result);
}
export const clearInputField = () => {
    elements.searchInput.value = '';
}
export const clearSearchList = () => {
    elements.searchList.innerHTML = '';
}