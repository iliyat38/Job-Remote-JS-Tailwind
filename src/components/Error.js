import {
    errorEl,
    errorTextEl,
    DEFAULT_DISPLAY_TIME
} from "../common.js";
const renderError = (message = 'something went wrong!') => {
    errorTextEl.textContent = message;
    errorEl.classList.remove('hidden');

    requestAnimationFrame(() => {
        errorEl.classList.add('error__visible');
        errorEl.classList.remove('opacity-0', '-translate-y-30');
    })

    setTimeout(() => {
        errorEl.classList.add('opacity-0', '-translate-y-30');
        errorEl.classList.remove('error--visible');

        setTimeout(() => {
            errorEl.classList.add('hidden');
        }, 300);
    }, DEFAULT_DISPLAY_TIME);
    return;
}

export default renderError;