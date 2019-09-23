export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchList: document.querySelector('.results__list'),
    searchResult: document.querySelector('.results'),
    buttonField: document.querySelector('.results__pages'),
    recipeField: document.querySelector('.recipe'),
    shopListField: document.querySelector('.shopping__list')
}

export const renderLoader = (parent) => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
}

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) loader.parentElement.removeChild(loader);
}