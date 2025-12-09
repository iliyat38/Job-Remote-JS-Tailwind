import {
    state,
    paginationEl,
    paginationBtnNextEl,
    paginationNumberNextEl,
    paginationBtnBackEl,
    paginationNumberBackEl,
    ITEM_SIZE_PER_PAGE
} from '../common.js';
import renderJobList from './jobList.js';

const renderPagingBtn = () => {
    if (state.currentPage >= 2) {
        paginationBtnBackEl.classList.remove('invisible');
    } else {
        paginationBtnBackEl.classList.add('invisible');
    }

    if ((state.searchJobItems.length - state.currentPage * ITEM_SIZE_PER_PAGE) <= 0) {
        paginationBtnNextEl.classList.add('invisible');
    } else {
        paginationBtnNextEl.classList.remove('invisible');
    }

    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    paginationBtnBackEl.blur();
    paginationBtnNextEl.blur();

};

const pagingHandler = e => {

    const clickedPage = e.target.closest('.pagination__button');

    if (!clickedPage) return;

    const nextPage = clickedPage.className.includes('--next') ? true : false;

    nextPage ? state.currentPage++ : state.currentPage--;

    renderJobList();
    renderPagingBtn();
};
paginationEl.addEventListener('click', pagingHandler);

export default renderPagingBtn;