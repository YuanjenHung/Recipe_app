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

export const getInput = () => elements.searchInput.value;

export const renderSearchList = arr => {
    arr.forEach(renderListItem);
}
export const clearInputField = () => {
    elements.searchInput.value = '';
}
export const clearSearchList = () => {
    elements.searchList.innerHTML = '';
}