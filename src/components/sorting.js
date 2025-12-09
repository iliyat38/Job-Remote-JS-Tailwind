import {
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    sortingEl,
    state,
    jobListSearchEl
} from '../common.js'

import renderJobList from "./jobList.js";
import renderPagingBtn from "./Pagination.js";

const clickHandler = e => {
    const clickedBtnEl = e.target.closest('.sorting__button');
    if (!clickedBtnEl) return;

    state.currentPage = 1;
    renderPagingBtn();

    const recent = clickedBtnEl.className.includes('--recent') ? true : false;
    if (jobListSearchEl.childElementCount > 0) {
        if (recent) {

            state.searchJobItems.sort((a, b) => {
                return a.daysAgo - b.daysAgo;
            });
            sortingBtnRelevantEl.classList.remove('sorting__button--active');
            sortingBtnRecentEl.classList.add('sorting__button--active');

        } else {
            state.searchJobItems.sort((a, b) => {
                return b.relevanceScore - a.relevanceScore;
            });
            sortingBtnRecentEl.classList.remove('sorting__button--active');
            sortingBtnRelevantEl.classList.add('sorting__button--active');
        }
    }
    renderJobList();
}

sortingEl.addEventListener('click', clickHandler);