import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';

import renderJobList from './jobList.js';

const clickHandler = (e) => {

    if (!e.target.className.includes('bookmark')) return;

    if (state.bookmarkJobItems.some(bookmark => bookmark.id === state.activeJobItem.id)) {
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmark => bookmark.id !== state.activeJobItem.id);
    } else {
        state.bookmarkJobItems.push(state.activeJobItem);
    }


    //local storage
    localStorage.setItem('bookmarksJobItems', JSON.stringify(state.bookmarkJobItems));

    document.querySelector('.job-info__bookmark-icon').classList.toggle('bookmark-active');
    renderJobList('search');
};

const mouseEnterHandler = () => {
    jobListBookmarksEl.classList.remove("opacity-0", "scale-90", "invisible", "pointer-events-none");
    jobListBookmarksEl.classList.add("opacity-100", "scale-100", "pointer-events-auto");
    renderJobList('bookmark');
}
const mouseLeaveHandler = () => {
    jobListBookmarksEl.classList.add("opacity-0", "scale-90", "invisible", "pointer-events-none");
    jobListBookmarksEl.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
}

jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
bookmarksBtnEl.addEventListener('mouseleave', mouseLeaveHandler);