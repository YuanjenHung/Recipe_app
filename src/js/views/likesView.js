import { elements } from './base';

export const toggleButton = (isLiked) => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = (length) => {
    elements.likeMenu.style.visibility = length > 0 ? 'visible' : 'hidden';
}