import {
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderError from './Error.js';
import renderJobDetailsHtml from './jobDetails.js';


const loadHandler = async (e) => {
    const id = window.location.hash.substring(1);

    if (id) {
        jobDetailsContentEl.innerHTML = '';

        renderSpinner('jobDetail');
        try {
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);

            const { jobItem } = data;
            state.activeJobItem = jobItem;

            console.log("ROUTER RECEIVED:", state.badgeColor);
            renderJobDetailsHtml(jobItem, state.badgeColor);
            renderSpinner('jobDetail');
        } catch (err) {
            renderError();
            console.log(err.message);
        }
    }
}


window.addEventListener('DOMContentLoaded', loadHandler);
window.addEventListener('hashchange', loadHandler);