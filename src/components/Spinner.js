import {
    spinnerJobDetailsEl,
    spinnerSearchEl
} from '../common.js';

const renderSpinner = wichSpinner => {
    const spinnerEl = wichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEl.classList.toggle('hidden');
}
export default renderSpinner;