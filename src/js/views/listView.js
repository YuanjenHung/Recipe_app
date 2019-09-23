import { elements } from './base';

export const renderItem = (item) => {
    const template = `
        <li class="shopping__item" data-id="${item.id}">
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingrediant}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopListField.insertAdjacentHTML('beforeend', template);
}

export const deleteItem = (id) => {
    const item = document.querySelector(`[data-id="${id}"]`);
    item.parentElement.removeChild(item);
}