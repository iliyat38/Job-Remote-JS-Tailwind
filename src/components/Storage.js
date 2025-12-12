import {
    state
} from '../common.js';

const storageJobItems = localStorage.getItem('bookmarksJobItems');
if (storageJobItems) {
    state.bookmarkJobItems = JSON.parse(storageJobItems);
}

// const storageBadgeColor = localStorage.getItem('badgeColor');
// if (storageBadgeColor) {
//     state.badgeColor = storageBadgeColor;
// }